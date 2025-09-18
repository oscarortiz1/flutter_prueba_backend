import { MovimientosService } from './movimientos.service';
import { CreateMovimientoDto } from './dto/create-movimiento.dto';
export declare class MovimientosController {
    private readonly movimientosService;
    constructor(movimientosService: MovimientosService);
    create(req: any, dto: CreateMovimientoDto): Promise<import("mongoose").Document<unknown, {}, import("./schemas/movimiento.schema").Movimiento, {}, {}> & import("./schemas/movimiento.schema").Movimiento & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    findAll(req: any): Promise<{
        data: (import("mongoose").Document<unknown, {}, import("./schemas/movimiento.schema").Movimiento, {}, {}> & import("./schemas/movimiento.schema").Movimiento & Required<{
            _id: unknown;
        }> & {
            __v: number;
        })[];
        total: number;
        totalPages: number;
    }>;
    remove(req: any, id: string): Promise<{
        success: boolean;
    }>;
}
