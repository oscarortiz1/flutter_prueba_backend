import { Model } from 'mongoose';
import { User } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
export declare class UsersService {
    private userModel;
    constructor(userModel: Model<User>);
    create(dto: CreateUserDto): Promise<User & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    findAll(): Promise<(import("mongoose").Document<unknown, {}, User, {}, {}> & User & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
    findByEmail(email: string): Promise<import("mongoose").Document<unknown, {}, User, {}, {}> & User & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    updateRefreshTokenHash(userId: any, hash: string | null): Promise<import("mongoose").Document<unknown, {}, User, {}, {}> & User & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    updateById(userId: any, data: {
        name?: string;
        email?: string;
        password?: string;
    }): Promise<import("mongoose").Document<unknown, {}, User, {}, {}> & User & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
}
