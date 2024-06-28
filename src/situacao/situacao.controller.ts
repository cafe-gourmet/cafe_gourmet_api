import { Body, Controller, Post } from '@nestjs/common';
import { SituacaoService } from './situacao.service';
import { SituacaoDTO } from './situacao.dto';
import { ApiBearerAuth, ApiBody, ApiResponse } from '@nestjs/swagger';

@Controller('situacao')
@ApiBearerAuth()
export class SituacaoController {
  constructor(private readonly situacaoService: SituacaoService) {}

  @Post()
  @ApiBody({ type: SituacaoDTO })
  @ApiResponse({ status: 200, description: 'Retorna a situação recém criada'})
  async create(@Body() data: SituacaoDTO) {
    return this.situacaoService.create(data);
  }
}
