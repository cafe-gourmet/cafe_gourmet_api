import { Injectable } from '@nestjs/common';
import { PlanoClienteService } from 'src/plano-cliente/plano-cliente.service';
import { PrismaService } from 'src/prisma.service';
import { CarrinhoDTO } from '../carrinho/carrinho.dto';
import { ProdutoService } from 'src/produto/produto.service';

@Injectable()
export class CarrinhoService {
  constructor(
    private prisma: PrismaService,
    private planoClienteService: PlanoClienteService,
    private produtoService: ProdutoService
  ) {}

  async obterUltimaCompra(idCliente: number): Promise<CarrinhoDTO[]> {
    return this.prisma.carrinho.findMany({
      where: {
        idCliente: idCliente,
        statusCarrinho: true,
      },
      include:{cliente:{include:{usuario:true}}, plano:true, produto:true }
    });
  }
  async obterTodasCompras(): Promise<CarrinhoDTO[]> {
    return this.prisma.carrinho.findMany({
      include: { cliente:{include:{usuario:true}}, plano:true, produto:true },
    });
  }
  //nasce com carrinho ativa e compra inativa
  //statusCarrinho = 1 e statusCompra = 0 -> aguardando pagamento
  //statusCarrinho = 0 e statusCompra = 1 -> compra aprovada
  //statuaCarrinho = 0 e statusCompra = 0 -> compra cancelada
  async criarCarrinho(data: CarrinhoDTO[]) {
    return data.forEach(
      async (cart) =>
        await this.prisma.carrinho.create({
          data: {
            idCliente: cart.idCliente,
            idPlano: cart.idPlano,
            idProduto: cart.idProduto,
            qntProduto: cart.qntProduto,
            statusCarrinho: true,
            statusCompra: false,
          },
        }),
    );
  }

  async confirmarCompra(idCliente: number) {
    const itens = await this.obterUltimaCompra(idCliente);
    if (itens) {
      itens.forEach(async (item) => {
        await this.prisma.carrinho.update({
          data: {
            statusCarrinho: false,
            statusCompra: true,
          },
          where: {
            id: item.id,
          },
        });
        if (item.idPlano) {
          await this.planoClienteService.vincular({
            idCliente: item.idCliente,
            idPlano: item.idPlano,
          });
        } else if (item.idProduto) {
          item.produto.quantidade = item.produto.quantidade - item.qntProduto;
          await this.produtoService.update(item.idProduto, item.produto);
        }
      });
    }
  }
  async cancelarCompra(idCliente: number) {
    const itens = await this.obterUltimaCompra(idCliente);
    if (itens) {
      return itens.forEach(
        async (item) =>
          await this.prisma.carrinho.update({
            data: {
              statusCarrinho: false,
              statusCompra: false,
            },
            where: {
              id: item.id,
            },
          }),
      );
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
