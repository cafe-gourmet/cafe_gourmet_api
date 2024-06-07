import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CarrinhoService } from './carrinho.service';
import { CarrinhoDTO } from './carrinho.dto';
import { Public } from 'src/auth/public.decorator';

@Controller('carrinho')
export class CarrinhoController {
    constructor(private readonly carrinhoService: CarrinhoService){}

    @Post('add')
    async add(@Body() data: CarrinhoDTO){
        return this.carrinhoService.adicionarAoCarrinho(data);
    }
    @Post('remove')
    async remove(@Body() data: CarrinhoDTO){
        return this.carrinhoService.removerDoCarrinho(data);
    }

    @Public()
    @Get(':idCliente')
    async find(@Param('idCliente') idCliente: string) {
        return this.carrinhoService.findAll(Number(idCliente));
    }
    @Delete(':idCliente')
    async delete(@Param('idCliente') idCliente: string) {
        return this.carrinhoService.limparCarrinho(Number(idCliente));
    }
}
