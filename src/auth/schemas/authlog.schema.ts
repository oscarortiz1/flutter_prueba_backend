import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class AuthLog extends Document {
  @Prop({ type: Types.ObjectId, ref: 'User' })
  userId: Types.ObjectId;

  @Prop()
  ip?: string;

  @Prop({ default: true })
  success: boolean;
}

export const AuthLogSchema = SchemaFactory.createForClass(AuthLog);
