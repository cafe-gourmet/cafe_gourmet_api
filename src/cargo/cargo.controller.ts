import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CargoService } from './cargo.service';
import { CargoDTO } from './cargo.dto';

@Controller('cargo')
export class CargoController {
  constructor(private readonly cargoService: CargoService) {}

  @Post()
  async create(@Body() data: CargoDTO) {
    return this.cargoService.create(data);
  }

  @Get('find')
  async findAll() {
    return this.cargoService.findAll();
  }

  @Get('find-one/:id')
  async findOne(@Param('id') id: string) {
    return this.cargoService.findOne(Number(id));
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() data: CargoDTO) {
    return this.cargoService.update(Number(id), data);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.cargoService.delete(Number(id));
  }
}
