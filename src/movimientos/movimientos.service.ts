import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Movimiento } from './schemas/movimiento.schema';
import { CreateMovimientoDto } from './dto/create-movimiento.dto';

@Injectable()
export class MovimientosService {
  constructor(@InjectModel(Movimiento.name) private movimientoModel: Model<Movimiento>) {}

  // create a movimiento associated to a userId
  async create(dto: CreateMovimientoDto, userId: string) {
    const payload: any = { ...dto, user: userId };
    const created = new this.movimientoModel(payload);
    return created.save();
  }

  // list movimientos for a specific user
  async findAllForUser(userId: string) {
    if (!userId) return [];
    return this.movimientoModel.find({ user: userId }).exec();
  }

  // remove movimiento by id, optionally restricting to user ownership
  async removeById(id: string, userId?: string) {
    if (userId) {
      const res = await this.movimientoModel.findOneAndDelete({ _id: id, user: userId }).exec();
      return res != null;
    }
    const res = await this.movimientoModel.findByIdAndDelete(id).exec();
    return res != null;
  }
}
