import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(dto: CreateUserDto) {
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(dto.password, salt);
    const created = new this.userModel({ ...dto, password: hashed });
    const saved = await created.save();
    // don't return password
    const obj = saved.toObject();
    delete obj.password;
    return obj;
  }

  async findAll() {
    return this.userModel.find().select('-password').exec();
  }

  // Find a single user including the hashed password (used by auth flows)
  async findByEmail(email: string) {
    const e = (email || '').trim();
    // use case-insensitive lookup to avoid case/whitespace mismatches
    return this.userModel.findOne({ email: new RegExp(`^${e}$`, 'i') }).exec();
  }

  async updateRefreshTokenHash(userId: any, hash: string | null) {
    // set or unset the refreshTokenHash on the user document
    return this.userModel.findByIdAndUpdate(userId, { refreshTokenHash: hash }, { new: true }).exec();
  }

  async updateById(userId: any, data: { name?: string; email?: string; password?: string }) {
    const update: any = {};
    if (data.name) update.name = data.name;
    if (data.email) update.email = data.email;
    if (data.password) {
      const salt = await bcrypt.genSalt(10);
      update.password = await bcrypt.hash(data.password, salt);
    }
    return this.userModel.findByIdAndUpdate(userId, update, { new: true }).exec();
  }
}
