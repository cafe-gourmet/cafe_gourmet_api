import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiResponse } from '@nestjs/swagger';
import { ContatoDTO } from './contato.dto';
import { ContatoService } from './contato.service';

@Controller('contato')
export class ContatoController {
  constructor(private readonly contatoService: ContatoService) {}

  @Post()
  @ApiBody({ type: ContatoDTO })
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: 'Retorna os dados de Contato recém criado',
  })
  async create(@Body() data: ContatoDTO) {
    return await this.contatoService.create(data);
  }

  @Get('find')
  async findAll() {
    return await this.contatoService.findActive();
  }

  @Put()
  @ApiBearerAuth()
  async update(@Body() data: ContatoDTO) {
    return await this.contatoService.update(data);
  }

  @Delete(':id')
  @ApiBearerAuth()
  async delete(@Param('id') id: string) {
    return await this.contatoService.delete(Number(id));
  }
}
