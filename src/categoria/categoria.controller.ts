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
import { ApiBearerAuth, ApiBody, ApiResponse } from '@nestjs/swagger';

@Controller('categoria')
@ApiBearerAuth()
export class CategoriaController {
  constructor(private readonly categoriaService: CategoriaService) {}

  @Post()
  @ApiBody({ type: CategoriaDTO })
  @ApiResponse({ status: 200, description: 'Retorna a Categoria recém criada', type: CategoriaDTO})
  async create(@Body() data: CategoriaDTO): Promise<CategoriaDTO>{
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
