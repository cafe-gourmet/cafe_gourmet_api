import { BadRequestException, Injectable } from '@nestjs/common';
import { CarrinhoDTO } from '../carrinho/carrinho.dto';
import { PrismaService } from 'src/prisma.service';
import { PlanoClienteService } from 'src/plano-cliente/plano-cliente.service';

@Injectable()
export class CarrinhoService {
  constructor(private prisma: PrismaService, private planoClienteService: PlanoClienteService) {}

  async obterUltimaCompra(idCliente: number): Promise<CarrinhoDTO[]> {
    return this.prisma.carrinho.findMany({
      where: {
        idCliente: idCliente,
        statusCarrinho: true,
      },
    });
  }
 async obterTodasCompras(idCliente: number): Promise<CarrinhoDTO[]> {
    return this.prisma.carrinho.findMany({
      where: {
        idCliente: idCliente
      },
    });
  }
  //nasce com carrinho ativa e compra inativa
  //statusCarrinho = 1 e statusCompra = 0 -> aguardando pagamento
  //statusCarrinho = 0 e statusCompra = 1 -> compra aprovada
  //statuaCarrinho = 0 e statusCompra = 0 -> compra cancelada
  async criarCarrinho(data: CarrinhoDTO[]) {
    return data.forEach(async (cart) => await this.prisma.carrinho.create({
      data: {
        idCliente: cart.idCliente,
        idPlano: cart.idPlano,
        idProduto: cart.idProduto,
        qntProduto: cart.idPlano,
        statusCarrinho: true,
        statusCompra: false
      },
    }));
  }

  async confirmarCompra(idCliente: number) {
    console.log(idCliente);
    const itens = await this.obterUltimaCompra(idCliente);
    if (itens) {
      itens.forEach(async (item) => {
        await this.prisma.carrinho.update({
          data: {
            statusCarrinho: false,
            statusCompra: true
          },
          where: {
            id: item.id,
          }
        });
        if (item.idPlano)
          await this.planoClienteService.vincular({idCliente: item.idCliente, idPlano: item.idPlano})
      });
    }
  }
  async cancelarCompra(idCliente: number) {
    const itens = await this.obterUltimaCompra(idCliente);
    if (itens) {
      return itens.forEach(async (item) => await this.prisma.carrinho.update({
      data: {
          statusCarrinho: false,
          statusCompra: false
        },
        where: {
          id: item.id,
        }
      }));
    }
  }
  async update(data: CarrinhoDTO) {
    const carrinho = await this.findOne(data);
    if (carrinho) {
      return this.prisma.carrinho.update({
        data,
        where: {
          id: carrinho.id,
        },
      });
    }
  }

  async findOne(data: CarrinhoDTO) {
    return this.prisma.carrinho.findFirst({
      where: {
        idCliente: data.idCliente,
        idProduto: data.idProduto,
      },
    });
  }
  async findAll(id: number) {
    return this.prisma.carrinho.findMany({
      where: {
        idCliente: id,
      },
    });
  }
}
