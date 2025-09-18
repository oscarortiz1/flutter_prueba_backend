import { MovimientosService } from './movimientos.service';
import { CreateMovimientoDto } from './dto/create-movimiento.dto';
export declare class MovimientosController {
    private readonly movimientosService;
    constructor(movimientosService: MovimientosService);
    create(dto: CreateMovimientoDto): Promise<import("mongoose").Document<unknown, {}, import("./schemas/movimiento.schema").Movimiento, {}, {}> & import("./schemas/movimiento.schema").Movimiento & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    findAll(): Promise<(import("mongoose").Document<unknown, {}, import("./schemas/movimiento.schema").Movimiento, {}, {}> & import("./schemas/movimiento.schema").Movimiento & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
    remove(id: string): Promise<{
        success: boolean;
    }>;
}
