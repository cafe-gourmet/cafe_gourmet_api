import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { AutenticacaoService } from './autenticacao.service';
import { AutenticacaoDTO } from './autenticacao.dto';

@Controller('autenticacao')
export class AutenticacaoController {
    constructor(private readonly autenticacaoService: AutenticacaoService){}
    
    @HttpCode(HttpStatus.OK)
    @Post('login')
    signIn(@Body() autenticacaoDTO: AutenticacaoDTO) {
      return this.autenticacaoService.signIn(autenticacaoDTO.email, autenticacaoDTO.senha);
    }
}
