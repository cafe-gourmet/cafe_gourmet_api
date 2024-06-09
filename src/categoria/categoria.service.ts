import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CategoriaDTO } from './categoria.dto';

@Injectable()
export class CategoriaService {
  constructor(private prisma: PrismaService) {}

  async create(data: CategoriaDTO) {
    const categoria = await this.prisma.categoria.create({
      data,
    });
    return categoria;
  }

  async findOne(idCategoria: number) {
    return this.prisma.categoria.findUnique({
      where: {
        id: idCategoria,
      },
    });
  }

  async findAll() {
    return this.prisma.categoria.findMany();
  }

  async update(id: number, data: CategoriaDTO) {
    if (!(await this.findOne(id))) {
      throw new BadRequestException('Categoria não existe!');
    }

    return await this.prisma.categoria.update({
      data,
      where: {
        id,
      },
    });
  }

  async delete(id: number) {
    const categoria = await this.findOne(id);

    if (!categoria) {
      throw new BadRequestException('Categoria não existe!');
    }

    return await this.prisma.categoria.delete({
      where: {
        id,
      },
    });
  }
}
