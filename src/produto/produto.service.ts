import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { ProdutoDTO } from './produto.dto';

@Injectable()
export class ProdutoService {
  constructor(private prisma: PrismaService) {}

  async create(data: ProdutoDTO) {
    const produto = await this.prisma.produto.create({
      data: {
        nome: data.nome,
        marca: data.marca,
        preco: data.preco,
        codigoBarras: data.codigoBarras,
        idCategoria: data.idCategoria,
        quantidade: data.quantidade,
        percentualDescontoAnual: data.percentualDescontoAnual,
        percentualDescontoMensal: data.percentualDescontoMensal,
        imgProduto1: data.imgProduto1,
        imgProduto2: data.imgProduto2,
        imgProduto3: data.imgProduto3,
      },
    });
    return produto;
  }

  async findOne(idProduto: number) {
    return this.prisma.produto.findUnique({
      where: {
        id: idProduto,
      },
      include: {
        categoria: true,
      },
    });
  }

  async findAll() {
    return this.prisma.produto.findMany({
      include: {
        categoria: true,
      },
    });
  }

  async update(id: number, data: ProdutoDTO) {
    if (!(await this.findOne(id))) {
      throw new BadRequestException('Produto não existe!');
    }

    return await this.prisma.produto.update({
      data,
      where: {
        id,
      },
    });
  }

  async delete(id: number) {
    const produto = await this.findOne(id);

    if (!produto) {
      throw new BadRequestException('Produto não existe!');
    }

    return await this.prisma.produto.delete({
      where: {
        id,
      },
    });
  }
}
