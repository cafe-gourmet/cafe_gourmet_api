import { Body, Controller, Get, HttpCode, HttpStatus, Post, Request, UseGuards } from '@nestjs/common';
import { AutenticacaoService } from './autenticacao.service';
import { AutenticacaoGuard } from './autenticacao.guard';
import { AutenticacaoDTO } from './autenticacao.dto';
import { Public } from './public.decorator';

@Controller('autenticacao')
export class AutenticacaoController {
    constructor(private readonly autenticacaoService: AutenticacaoService){}
    
    @HttpCode(HttpStatus.OK)
    @Post('login')
    @Public()
    signIn(@Body() autenticacaoDTO: AutenticacaoDTO) {
      return this.autenticacaoService.signIn(autenticacaoDTO.email, autenticacaoDTO.senha);
    }

    @UseGuards(AutenticacaoGuard)
    @Get('profile')
    getUser(@Request() req) {
      return req.user;
    }
}
