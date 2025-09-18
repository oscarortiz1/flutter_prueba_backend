import { Document, Types } from 'mongoose';
export declare class AuthLog extends Document {
    userId: Types.ObjectId;
    ip?: string;
    success: boolean;
}
export declare const AuthLogSchema: import("mongoose").Schema<AuthLog, import("mongoose").Model<AuthLog, any, any, any, Document<unknown, any, AuthLog, any, {}> & AuthLog & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, AuthLog, Document<unknown, {}, import("mongoose").FlatRecord<AuthLog>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<AuthLog> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
