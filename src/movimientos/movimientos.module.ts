import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MovimientosService } from './movimientos.service';
import { MovimientosController } from './movimientos.controller';
import { Movimiento, MovimientoSchema } from './schemas/movimiento.schema';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Movimiento.name, schema: MovimientoSchema }]),
    forwardRef(() => AuthModule),
  ],
  providers: [MovimientosService],
  controllers: [MovimientosController],
})
export class MovimientosModule {}
