import { BadRequestException, Injectable } from '@nestjs/common';
import { CarrinhoDTO } from '../carrinho/carrinho.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class CarrinhoService {

  constructor(private prisma: PrismaService){}

  async adicionarAoCarrinho(data: CarrinhoDTO){
    if(!await this.findOne(data))
      return this.criarCarrinho(data);
    else
      return this.update(data);
  }
  async removerDoCarrinho(data: CarrinhoDTO){

    if(!this.findOne(data))
      throw new BadRequestException('Não existe esse produto no Carrinho!');
    
    return this.update(data);
  }

  async criarCarrinho(data: CarrinhoDTO){
    const carrinho = await this.prisma.carrinho.create({
      data,
    })
    return carrinho;
  }

  async limparCarrinho(idCliente: number) {
    const itensCarrinho = await this.findAll(idCliente);
    console.log(itensCarrinho);
    itensCarrinho.forEach(async element => {
       await this.prisma.carrinho.delete({
        where: {
          id: element.id,
        }
      });
    });
  }

  async update(data: CarrinhoDTO){
    var carrinho = await this.findOne(data);
    if(carrinho){
      return this.prisma.carrinho.update({
        data,
        where: {
          id: carrinho.id
        }
      });
    }
  } 
  
  async findOne(data: CarrinhoDTO){
    return this.prisma.carrinho.findFirst({
      where: {
        idCliente: data.idCliente,
        idProduto: data.idProduto,
      }
    });
  }
  async findAll(id: number){
    return this.prisma.carrinho.findMany({
      where: {
        idCliente: id,
      }
    });
  }
}