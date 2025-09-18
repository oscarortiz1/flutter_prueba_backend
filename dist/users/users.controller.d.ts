import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    create(dto: CreateUserDto): Promise<import("./schemas/user.schema").User & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    findAll(): Promise<(import("mongoose").Document<unknown, {}, import("./schemas/user.schema").User, {}, {}> & import("./schemas/user.schema").User & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
    updateMe(req: any, body: {
        name?: string;
        email?: string;
        password?: string;
    }): Promise<(import("mongoose").Document<unknown, {}, import("./schemas/user.schema").User, {}, {}> & import("./schemas/user.schema").User & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }) | (import("./schemas/user.schema").User & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }) | {
        error: string;
    }>;
}
