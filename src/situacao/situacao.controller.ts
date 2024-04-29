import { Body, Controller, Post } from '@nestjs/common';
import { SituacaoService } from './situacao.service';
import { SituacaoDTO } from './situacao.dto';

@Controller('situacao')
export class SituacaoController {
    constructor(private readonly situacaoService: SituacaoService){}

    @Post()
    async create(@Body() data: SituacaoDTO){
        return this.situacaoService.create(data);
    }

}
