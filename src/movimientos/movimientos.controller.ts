import { Body, Controller, Get, Post, Delete, Param, Logger, NotFoundException, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { MovimientosService } from './movimientos.service';
import { CreateMovimientoDto } from './dto/create-movimiento.dto';

const log = new Logger('MovimientosController');

@Controller('movimientos')
export class MovimientosController {
  constructor(private readonly movimientosService: MovimientosService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Req() req: any, @Body() dto: CreateMovimientoDto) {
    const userId = req.user?.sub;
    log.debug(`create() user=${userId} body: ${JSON.stringify(dto)}`);
    return this.movimientosService.create(dto, userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Req() req: any) {
    const userId = req.user?.sub;
    return this.movimientosService.findAllForUser(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Req() req: any, @Param('id') id: string) {
    const userId = req.user?.sub;
    const deleted = await this.movimientosService.removeById(id, userId);
    if (!deleted) throw new NotFoundException();
    return { success: true };
  }
}
