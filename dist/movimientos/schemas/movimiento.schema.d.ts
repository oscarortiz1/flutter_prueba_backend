import { Document } from 'mongoose';
export declare class Movimiento extends Document {
    type: string;
    amount: number;
    description?: string;
    accountFrom: string;
    accountTo: string;
    currency: string;
    status: string;
    reference?: string;
    valueDate?: Date;
}
export declare const MovimientoSchema: import("mongoose").Schema<Movimiento, import("mongoose").Model<Movimiento, any, any, any, Document<unknown, any, Movimiento, any, {}> & Movimiento & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Movimiento, Document<unknown, {}, import("mongoose").FlatRecord<Movimiento>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<Movimiento> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
