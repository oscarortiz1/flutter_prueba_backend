import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Movimiento } from './schemas/movimiento.schema';
import { CreateMovimientoDto } from './dto/create-movimiento.dto';

@Injectable()
export class MovimientosService {
  constructor(@InjectModel(Movimiento.name) private movimientoModel: Model<Movimiento>) {}

  async create(dto: CreateMovimientoDto) {
    const created = new this.movimientoModel(dto);
    return created.save();
  }

  async findAll() {
    return this.movimientoModel.find().exec();
  }

  async removeById(id: string) {
    const res = await this.movimientoModel.findByIdAndDelete(id).exec();
    return res != null;
  }
}
