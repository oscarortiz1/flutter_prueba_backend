import { Body, Controller, Get, Post, Delete, Param, Logger, NotFoundException } from '@nestjs/common';
import { MovimientosService } from './movimientos.service';
import { CreateMovimientoDto } from './dto/create-movimiento.dto';

const log = new Logger('MovimientosController');

@Controller('movimientos')
export class MovimientosController {
  constructor(private readonly movimientosService: MovimientosService) {}

  @Post()
  create(@Body() dto: CreateMovimientoDto) {
    log.debug(`create() received body: ${JSON.stringify(dto)}`);
    return this.movimientosService.create(dto);
  }

  @Get()
  findAll() {
    return this.movimientosService.findAll();
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const deleted = await this.movimientosService.removeById(id);
    if (!deleted) throw new NotFoundException();
    return { success: true };
  }
}
