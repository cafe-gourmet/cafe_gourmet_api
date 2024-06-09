import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AutenticacaoDTO } from './autenticacao.dto';
import { AutenticacaoGuard } from './autenticacao.guard';
import { AutenticacaoService } from './autenticacao.service';
import { Public } from './public.decorator';

@Controller('autenticacao')
export class AutenticacaoController {
  constructor(private readonly autenticacaoService: AutenticacaoService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  @Public()
  signIn(@Body() autenticacaoDTO: AutenticacaoDTO) {
    return this.autenticacaoService.signIn(
      autenticacaoDTO.email,
      autenticacaoDTO.senha,
    );
  }

  @UseGuards(AutenticacaoGuard)
  @Get('profile')
  getUser(@Request() req) {
    return req.user;
  }
}
