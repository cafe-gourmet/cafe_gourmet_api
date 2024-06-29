import { Body, Controller, Delete, Param, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiResponse } from '@nestjs/swagger';
import { PlanoClienteDTO } from './plano-cliente.dto';
import { PlanoClienteService } from './plano-cliente.service';

@ApiBearerAuth()
@Controller('plano-cliente')
export class PlanoClienteController {
  constructor(private readonly planoClienteService: PlanoClienteService) {}

  @Post()
  @ApiBody({ type: PlanoClienteDTO })
  @ApiResponse({
    status: 200,
    description: 'Retorna o vínculo do cliente e plano recém feito',
  })
  async create(@Body() data: PlanoClienteDTO) {
    return this.planoClienteService.vincular(data);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.planoClienteService.desvincular(Number(id));
  }
}
