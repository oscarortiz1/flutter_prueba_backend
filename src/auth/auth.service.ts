import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { randomBytes } from 'crypto';
import { AuthLog } from './schemas/authlog.schema';
import { UsersService } from '../users/users.service';
import { User } from '../users/schemas/user.schema';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectModel(AuthLog.name) private authLogModel: Model<AuthLog>,
    private usersService: UsersService,
  ) {}

  async validateUser(email: string, pass: string): Promise<User | null> {
    // fetch the user including hashed password (do not log sensitive fields)
    const user = await this.usersService.findByEmail(email);
    console.log(`validateUser: email=${email} userFound=${!!user}`);

    if (!user || !user.password) return null;
    try {
      const match = await bcrypt.compare(pass, user.password);
      if (match) {
        const u = user.toObject ? user.toObject() : user;
        delete u.password;
        return u;
      }
      // password didn't match
      return null;
    } catch (err) {
      console.error('validateUser: bcrypt.compare error', err);
      return null;
    }
    
  }

  async login(user: any, ip?: string) {
    const payload = { sub: user._id, email: user.email };
    const token = this.jwtService.sign(payload);
    await this.authLogModel.create({ userId: user._id, ip, success: true });
    return { access_token: token };
  }

  // Simple in-memory OTP store: email -> { code, expires }
  private otpStore: Map<string, { code: string; expires: number }> = new Map();

  // Request an OTP: validate credentials, generate code and store it temporarily.
  async requestOtp(email: string, pass: string) {
    const user = await this.validateUser(email, pass);
    if (!user) return null;
    const code = (1000 + Math.floor(Math.random() * 9000)).toString();
    const expires = Date.now() + 5 * 60 * 1000; // 5 minutes
    const key = (email || '').trim().toLowerCase();
    this.otpStore.set(key, { code, expires });
    // log attempt
    await this.authLogModel.create({ userId: user._id, ip: null, success: true, note: 'otp_requested' } as any);
    return code;
  }

  // Verify OTP and return JWT if valid
  async verifyOtp(email: string, code: string, ip?: string) {
    const key = (email || '').trim().toLowerCase();
    const rec = this.otpStore.get(key);
    console.log('verifyOtp rec=', rec);
    if (!rec) return null;
    if (rec.expires < Date.now()) {
      this.otpStore.delete(key);
      return null;
    }
    console.log(`verifyOtp: expected=${rec.code} provided=${code}`);
    if (rec.code !== code) return null;
    // find user
  const user = await this.usersService.findByEmail(email);
  if (!user) return null;
    // remove used otp
    this.otpStore.delete(key);
    // sign access token
    const payload = { sub: user._id, email: user.email };
    const token = this.jwtService.sign(payload);

    // create a refresh token (random 64 bytes hex), hash it and store on user
    const refreshToken = randomBytes(64).toString('hex');
    const refreshHash = await bcrypt.hash(refreshToken, 10);
    try {
      // store refreshTokenHash on user document
      await this.usersService.updateRefreshTokenHash(user._id, refreshHash);
    } catch (err) {
      console.error('Failed to store refresh token hash', err);
    }

    await this.authLogModel.create({ userId: user._id, ip, success: true, note: 'otp_verified' } as any);
    return { access_token: token, refresh_token: refreshToken };
  }

  // Validate a refresh token and issue new access token
  async refreshAccessToken(email: string, refreshToken: string) {
    const user = await this.usersService.findByEmail(email);
    if (!user || !user.refreshTokenHash) return null;
    const ok = await bcrypt.compare(refreshToken, user.refreshTokenHash);
    if (!ok) return null;
    const payload = { sub: user._id, email: user.email };
    const token = this.jwtService.sign(payload);
    return { access_token: token };
  }

  async revokeRefreshToken(email: string) {
    const user = await this.usersService.findByEmail(email);
    if (!user) return;
    await this.usersService.updateRefreshTokenHash(user._id, null);
  }
}
