import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { PlanoClienteDTO } from './plano-cliente.dto';
import { PlanoClienteService } from './plano-cliente.service';
import { Public } from 'src/authentication/public.decorator';

@Public()
@Controller('plano-cliente')
export class PlanoClienteController {
  constructor(private readonly planoClienteService: PlanoClienteService) {}

  @Post()
  async create(@Body() data: PlanoClienteDTO) {
    return this.planoClienteService.vincular(data);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.planoClienteService.desvincular(Number(id));
  }
}
