import { Body, Controller, Post } from '@nestjs/common';
import { CarrinhoService } from './carrinho.service';
import { CarrinhoDTO } from './carrinho.dto';

@Controller('carrinho')
export class CarrinhoController {
    constructor(private readonly carrinhoService: CarrinhoService){}

    @Post()
    async create(@Body() data: CarrinhoDTO){
        return this.carrinhoService.create(data);
    }

}
