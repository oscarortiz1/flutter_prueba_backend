import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Movimiento extends Document {
  @Prop({ required: true })
  type: string;

  @Prop({ required: true })
  amount: number;

  @Prop()
  description?: string;

  @Prop({ required: true })
  accountFrom: string;

  @Prop({ required: true })
  accountTo: string;

  @Prop({ default: 'PEN' })
  currency: string;

  @Prop({ default: 'pending' })
  status: string; // pending, completed, failed

  @Prop()
  reference?: string;

  @Prop()
  valueDate?: Date;
}

export const MovimientoSchema = SchemaFactory.createForClass(Movimiento);
