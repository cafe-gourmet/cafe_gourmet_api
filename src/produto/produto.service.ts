import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { ProdutoDTO } from './produto.dto';

@Injectable()
export class ProdutoService {
  constructor(private prisma: PrismaService) {}

  async create(data: ProdutoDTO) {
    const produto = await this.prisma.produto.create({
      data,
    });
    return produto;
  }

  async findOne(idProduto: number) {
    return this.prisma.produto.findUnique({
      where: {
        id: idProduto,
      },
    });
  }

  async findAll() {
    return this.prisma.produto.findMany();
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
