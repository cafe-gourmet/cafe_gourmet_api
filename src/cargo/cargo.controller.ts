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
import { ApiBearerAuth, ApiBody, ApiResponse } from '@nestjs/swagger';

@Controller('cargo')
@ApiBearerAuth()
export class CargoController {
  constructor(private readonly cargoService: CargoService) {}

  @Post()
  @ApiBody({ type: CargoDTO })
  @ApiResponse({ status: 200, description: 'Retorna o cargo recém criado', type:CargoDTO})
  async create(@Body() data: CargoDTO):Promise<CargoDTO> {
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
