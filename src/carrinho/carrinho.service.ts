import { Injectable } from '@nestjs/common';
import { CarrinhoDTO } from '../carrinho/carrinho.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class CarrinhoService {

  constructor(private prisma: PrismaService){}

  async create(data: CarrinhoDTO){
    const carrinho = await this.prisma.carrinho.create({
      data,
    })
    return carrinho;
  }

}