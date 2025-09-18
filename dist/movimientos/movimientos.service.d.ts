import { Model } from 'mongoose';
import { Movimiento } from './schemas/movimiento.schema';
import { CreateMovimientoDto } from './dto/create-movimiento.dto';
export declare class MovimientosService {
    private movimientoModel;
    constructor(movimientoModel: Model<Movimiento>);
    create(dto: CreateMovimientoDto): Promise<import("mongoose").Document<unknown, {}, Movimiento, {}, {}> & Movimiento & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    findAll(): Promise<(import("mongoose").Document<unknown, {}, Movimiento, {}, {}> & Movimiento & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
    removeById(id: string): Promise<boolean>;
}
