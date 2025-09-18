import { Body, Controller, Get, Post, Patch, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() dto: CreateUserDto) {
    return this.usersService.create(dto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Patch('me')
  @UseGuards(JwtAuthGuard)
  async updateMe(@Req() req: any, @Body() body: { name?: string; email?: string; password?: string }) {
    const payload = req.user;
    if (!payload || !payload.sub) return { error: 'Invalid token' };
    const updated = await this.usersService.updateById(payload.sub, body);
    if (!updated) return { error: 'Update failed' };
    const obj = updated.toObject ? updated.toObject() : updated;
    delete obj.password;
    delete obj.refreshTokenHash;
    return obj;
  }
}
