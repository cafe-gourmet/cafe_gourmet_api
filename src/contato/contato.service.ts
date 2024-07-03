import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { ContatoDTO } from './contato.dto';

@Injectable()
export class ContatoService {
  constructor(private prisma: PrismaService) {}

  async create(data: ContatoDTO) {
    var contatoOld = await this.findActive();
    if (contatoOld)
      await this.delete(contatoOld[0].id)

    data.idSituacao = 1;
    const contato = await this.prisma.contato.create({
      data,
    });
    return contato;
  }

  async findOne(id: number) {
    return await this.prisma.contato.findUnique({
      where: {
        id: id,
      },
    });
  }

  async findActive() {
    return await this.prisma.contato.findMany({
      where: {
        idSituacao: 1
      }
    });
  }

  async update(data: ContatoDTO) {
    return await this.prisma.contato.update({
      data,
      where: {
        id:data.id,
      },
    });
  }

  async delete(id: number) {
    const contato = await this.findOne(id);

    if (!contato) {
      throw new BadRequestException('Contato não encontrado!');
    }
    contato.idSituacao = 2;
    return await this.update(contato);
  }
}
