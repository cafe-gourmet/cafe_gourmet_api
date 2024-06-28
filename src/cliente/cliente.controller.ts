import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ClienteClassDTO } from './cliente.dto';
import { ClienteService } from './cliente.service';
import { ApiResponse, ApiBody, ApiBearerAuth } from '@nestjs/swagger';

@Controller('cliente')
@ApiBearerAuth()
export class ClienteController {
  constructor(private readonly clienteService: ClienteService) {}

  // @Post()
  // @ApiBody({ type: ClienteClassDTO })
  // @ApiResponse({ status: 200, description: 'Retorna o cliente recém criado'})
  // async create(@Body() data: ClienteClassDTO) {
  //   return this.clienteService.create(data);
  // }

  // @Get('find')
  // async findAll() {
  //   return this.clienteService.findAll();
  // }

  // @Get('find-one/:id')
  // async findOne(@Param('id') id: string) {
  //   return this.clienteService.findOne(Number(id));
  // }

  // // // http://localhost:3000/238498239472934
  // @Put(':id')
  // async update(@Param('id') id: number, @Body() data: ClienteDTO) {
  //     return this.clienteService.update(Number(id), data);
  // }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.clienteService.delete(Number(id));
  }
}
