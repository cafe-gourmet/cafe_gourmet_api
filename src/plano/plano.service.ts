import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { PlanoDTO } from './plano.dto';

@Injectable()
export class PlanoService {
  constructor(private prisma: PrismaService) {}

  async findOne(idPlano: number) {
    return this.prisma.plano.findUnique({
      where: {
        id: idPlano,
      },
    });
  }

  async findAll() {
    return this.prisma.plano.findMany({include:{periodo:true, situacao:true}});
  }
  async create(data: PlanoDTO) {
    const plano = await this.prisma.plano.create({
      data,
    });
    return plano;
  }
  async update(id: number, data: PlanoDTO) {
    const planoExiste = await this.findOne(id);

    if (!planoExiste) {
      throw new BadRequestException('Plano não existe!');
    }

    return await this.prisma.plano.update({
      data,
      where: {
        id,
      },
    });
  }

  async delete(id: number) {
    const plano = await this.findOne(id);

    if (!plano) {
      throw new BadRequestException('Usuário não existe!');
    }
    //vou criar um enum depois pra tratar as situações. 1- ativo, 2- inativo;
    plano.idSituacao = 2;

    return await this.update(id, plano);
  }
}
