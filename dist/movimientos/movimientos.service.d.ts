import { Model } from 'mongoose';
import { Movimiento } from './schemas/movimiento.schema';
import { CreateMovimientoDto } from './dto/create-movimiento.dto';
export declare class MovimientosService {
    private movimientoModel;
    constructor(movimientoModel: Model<Movimiento>);
    create(dto: CreateMovimientoDto, userId: string): Promise<import("mongoose").Document<unknown, {}, Movimiento, {}, {}> & Movimiento & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    findAllForUser(userId: string): Promise<(import("mongoose").Document<unknown, {}, Movimiento, {}, {}> & Movimiento & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
    findForUserPaged(userId: string, page?: number, limit?: number): Promise<{
        data: (import("mongoose").Document<unknown, {}, Movimiento, {}, {}> & Movimiento & Required<{
            _id: unknown;
        }> & {
            __v: number;
        })[];
        total: number;
        totalPages: number;
    }>;
    removeById(id: string, userId?: string): Promise<boolean>;
}
