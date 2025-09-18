import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/login.dto';
import { RequestOtpDto } from './dto/request-otp.dto';
import { VerifyOtpDto } from './dto/verify-otp.dto';
export declare class AuthController {
    private authService;
    private usersService;
    constructor(authService: AuthService, usersService: UsersService);
    login(body: LoginDto, req: any): Promise<{
        error: string;
        code?: undefined;
    } | {
        code: string;
        error?: undefined;
    }>;
    register(body: {
        name: string;
        email: string;
        password: string;
    }): Promise<import("../users/schemas/user.schema").User & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    requestOtp(body: RequestOtpDto): Promise<{
        error: string;
        code?: undefined;
    } | {
        code: string;
        error?: undefined;
    }>;
    verifyOtp(body: VerifyOtpDto, req: any): Promise<{
        access_token: string;
        refresh_token: string;
    } | {
        error: string;
    }>;
    refresh(body: {
        email: string;
        refresh_token: string;
    }): Promise<{
        access_token: string;
    } | {
        error: string;
    }>;
    logout(body: {
        email: string;
    }): Promise<{
        ok: boolean;
    }>;
    me(req: any): Promise<(import("mongoose").Document<unknown, {}, import("../users/schemas/user.schema").User, {}, {}> & import("../users/schemas/user.schema").User & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }) | (import("../users/schemas/user.schema").User & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }) | {
        error: string;
    }>;
}
