import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MovimientosService } from './movimientos.service';
import { MovimientosController } from './movimientos.controller';
import { Movimiento, MovimientoSchema } from './schemas/movimiento.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Movimiento.name, schema: MovimientoSchema }])],
  providers: [MovimientosService],
  controllers: [MovimientosController],
})
export class MovimientosModule {}
