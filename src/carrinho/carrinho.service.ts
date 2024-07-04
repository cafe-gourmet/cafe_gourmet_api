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
    private produtoService: ProdutoService,
  ) {}

  async obterUltimaCompra(idCliente: number): Promise<CarrinhoDTO[]> {
    return this.prisma.carrinho.findMany({
      where: {
        idCliente: idCliente,
        statusCarrinho: true,
      },
      include: {
        cliente: { include: { usuario: true } },
        plano: true,
        produto: { include: { categoria: true } },
      },
    });
  }
  async obterTodasCompras(): Promise<CarrinhoDTO[]> {
    return this.prisma.carrinho.findMany({
      include: {
        cliente: { include: { usuario: true } },
        plano: true,
        produto: { include: { categoria: true } },
      },
    });
  }
  async obterTodasComprasCliente(id: number): Promise<CarrinhoDTO[]> {
    return this.prisma.carrinho.findMany({
      where: { idCliente: id },
      include: {
        cliente: { include: { usuario: true } },
        plano: true,
        produto: { include: { categoria: true } },
      },
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

  async confirmarCompra(idCarrinho: number) {
    const carrinho: CarrinhoDTO = await this.prisma.carrinho.update({
      data: {
        statusCarrinho: false,
        statusCompra: true,
      },
      where: {
        id: idCarrinho,
      },
      include: {
        produto: true,
      },
    });

    if (carrinho.idPlano) {
      await this.planoClienteService.vincular({
        idCliente: carrinho.idCliente,
        idPlano: carrinho.idPlano,
      });
    } else if (carrinho.idProduto) {
      carrinho.produto.quantidade =
        carrinho.produto.quantidade - carrinho.qntProduto;
      await this.produtoService.update(carrinho.idProduto, carrinho.produto);
    }
  }
  async cancelarCompra(idCarrinho: number) {
    return await this.prisma.carrinho.update({
      data: {
        statusCarrinho: false,
        statusCompra: false,
      },
      where: {
        id: idCarrinho,
      },
    });
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
