import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ProdutoService } from './produto.service';
import { ProdutoDTO } from './produto.dto';
import { ApiResponse, ApiBody, ApiBearerAuth } from '@nestjs/swagger';

@Controller('produto')
@ApiBearerAuth()
export class ProdutoController {
  constructor(private readonly produtoService: ProdutoService) {}

  @Post()
  @ApiBody({ type: ProdutoDTO })
  @ApiResponse({
    status: 200,
    description: 'Retorna o período recém criado',
    type: ProdutoDTO,
  })
  async create(@Body() data: ProdutoDTO) {
    return this.produtoService.create(data);
  }

  @Get('find')
  async findAll() {
    return this.produtoService.findAll();
  }

  @Get('find-one/:id')
  async findOne(@Param('id') id: string) {
    return this.produtoService.findOne(Number(id));
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() data: ProdutoDTO) {
    return this.produtoService.update(Number(id), data);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.produtoService.delete(Number(id));
  }
}
