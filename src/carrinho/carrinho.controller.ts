import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { Public } from 'src/authentication/public.decorator';
import { CarrinhoDTO } from './carrinho.dto';
import { CarrinhoService } from './carrinho.service';

@Controller('carrinho')
@Public()
export class CarrinhoController {
  constructor(private readonly carrinhoService: CarrinhoService) {}

  @Post('adicionar')
  async criarCarrinho(@Body() data: CarrinhoDTO[]) {
    return await this.carrinhoService.criarCarrinho(data);
  }
  @Put('confirmarCompra/:id')
  async confirmarCompra(@Param('id') idCliente: string) {
    console.log(idCliente);
    return this.carrinhoService.confirmarCompra(Number(idCliente));
  }
  @Put('cancelarCompra/:id')
  async cancelarCompra(@Param('id') idCliente: string) {
    return this.carrinhoService.cancelarCompra(Number(idCliente));
  }
  //essa aqui usa no relatorio
  @Get('obterTodasCompras')
  async obterTodasCompras() {
    return this.carrinhoService.obterTodasCompras();
  }
  //essa aqui usa no admin pra confirmar o pagamento
  @Get('obterUltimaCompra/:id')
  async obterUltimaCompra(@Param('id') idCliente: string) {
    return this.carrinhoService.obterUltimaCompra(Number(idCliente));
  }
}
