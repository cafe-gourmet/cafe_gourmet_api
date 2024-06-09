import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CategoriaService } from './categoria.service';
import { CategoriaDTO } from './categoria.dto';

@Controller('categoria')
export class CategoriaController {
  constructor(private readonly categoriaService: CategoriaService) {}

  @Post()
  async create(@Body() data: CategoriaDTO) {
    return this.categoriaService.create(data);
  }

  @Get('find')
  async findAll() {
    return this.categoriaService.findAll();
  }

  @Get('find-one/:id')
  async findOne(@Param('id') id: string) {
    return this.categoriaService.findOne(Number(id));
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() data: CategoriaDTO) {
    return this.categoriaService.update(Number(id), data);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.categoriaService.delete(Number(id));
  }
}
