import { Body, Controller, Post, Req, Get, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/login.dto';
import { RequestOtpDto } from './dto/request-otp.dto';
import { VerifyOtpDto } from './dto/verify-otp.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from './jwt-auth.guard';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService, private usersService: UsersService) {}

  @Post('login')
  @ApiOperation({ summary: 'Request OTP using email and password (demo returns code)' })
  async login(@Body() body: LoginDto, @Req() req: any) {
    try {
      // For demo/testing we treat login as an OTP request flow: return code instead of JWT
      const code = await this.authService.requestOtp(body.email, body.password);
      if (!code) return { error: 'Invalid credentials' };
      return { code };
    } catch (error) {
      console.error('Login error', error);
      return { error: 'Server error during login' };
    }
  }

  @Post('register')
  async register(@Body() body: { name: string; email: string; password: string }) {
    const created = await this.usersService.create(body as any);
    return created;
  }

  @Post('request-otp')
  @ApiOperation({ summary: 'Request an OTP (for demo returns code)' })
  async requestOtp(@Body() body: RequestOtpDto) {
    const code = await this.authService.requestOtp(body.email, body.password);
    if (!code) return { error: 'Invalid credentials' };
    return { code }; // for testing; in production you'd send via email/SMS
  }

  @Post('verify-otp')
  @ApiOperation({ summary: 'Verify OTP and return JWT' })
  async verifyOtp(@Body() body: VerifyOtpDto, @Req() req: any) {
    const token = await this.authService.verifyOtp(body.email, body.code, req.ip || null);
    if (!token) return { error: 'Invalid or expired OTP' };
    return token;
  }

  @Post('refresh')
  @ApiOperation({ summary: 'Refresh access token using refresh token' })
  async refresh(@Body() body: { email: string; refresh_token: string }) {
    const token = await this.authService.refreshAccessToken(body.email, body.refresh_token);
    if (!token) return { error: 'Invalid refresh token' };
    return token;
  }

  @Post('logout')
  @ApiOperation({ summary: 'Revoke refresh token (logout)' })
  async logout(@Body() body: { email: string }) {
    await this.authService.revokeRefreshToken(body.email);
    return { ok: true };
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get current user from JWT' })
  async me(@Req() req: any) {
    try {
      const payload = req.user;
      if (!payload || !payload.email) return { error: 'Invalid token payload' };
      const user = await this.usersService.findByEmail(payload.email);
      if (!user) return { error: 'User not found' };
      const obj = user.toObject ? user.toObject() : user;
      delete obj.password;
      delete obj.refreshTokenHash;
      return obj;
    } catch (err) {
      console.error('me error', err);
      return { error: 'Failed to fetch user' };
    }
  }
}
