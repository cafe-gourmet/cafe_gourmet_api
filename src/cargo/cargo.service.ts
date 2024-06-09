import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CargoDTO } from './cargo.dto';

@Injectable()
export class CargoService {
  constructor(private prisma: PrismaService) {}

  async create(data: CargoDTO) {
    const cargo = await this.prisma.cargo.create({
      data,
    });
    return cargo;
  }

  async findOne(idCargo: number) {
    return this.prisma.cargo.findUnique({
      where: {
        id: idCargo,
      },
    });
  }

  async findAll() {
    return this.prisma.cargo.findMany();
  }

  async update(id: number, data: CargoDTO) {
    if (!(await this.findOne(id))) {
      throw new BadRequestException('Usuário não existe!');
    }

    return await this.prisma.cargo.update({
      data,
      where: {
        id,
      },
    });
  }

  async delete(id: number) {
    const cargo = await this.findOne(id);

    if (!cargo) {
      throw new BadRequestException('Cargo não existe!');
    }
    //vou criar um enum depois pra tratar as situações. 1- ativo, 2- inativo;
    cargo.idSituacao = 2;

    return await this.update(id, cargo);
  }
}
