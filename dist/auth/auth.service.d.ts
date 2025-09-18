import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
import { AuthLog } from './schemas/authlog.schema';
import { UsersService } from '../users/users.service';
import { User } from '../users/schemas/user.schema';
export declare class AuthService {
    private jwtService;
    private authLogModel;
    private usersService;
    constructor(jwtService: JwtService, authLogModel: Model<AuthLog>, usersService: UsersService);
    validateUser(email: string, pass: string): Promise<User | null>;
    login(user: any, ip?: string): Promise<{
        access_token: string;
    }>;
    private otpStore;
    requestOtp(email: string, pass: string): Promise<string>;
    verifyOtp(email: string, code: string, ip?: string): Promise<{
        access_token: string;
        refresh_token: string;
    }>;
    refreshAccessToken(email: string, refreshToken: string): Promise<{
        access_token: string;
    }>;
    revokeRefreshToken(email: string): Promise<void>;
}
