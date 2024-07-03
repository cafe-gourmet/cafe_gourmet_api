import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { SobreNosDTO } from './sobre-nos.dto';

@Injectable()
export class SobreNosService {
  constructor(private prisma: PrismaService) {}

  async create(data: SobreNosDTO) {
    data.idSituacao = 1;
    const texto = await this.prisma.sobreNos.create({
      data,
    });
    return texto;
  }

  async findOne(idTexto: number) {
    return this.prisma.sobreNos.findUnique({
      where: {
        id: idTexto,
      },
    });
  }

  async findActive() {
    return this.prisma.sobreNos.findMany({
      where: {
        idSituacao: 1
      }
    });
  }

  async update(id: number, data: SobreNosDTO) {
    if (!(await this.findOne(id))) {
      throw new BadRequestException('Informação não encontrada!');
    }

    return await this.prisma.sobreNos.update({
      data,
      where: {
        id,
      },
    });
  }

  async delete(id: number) {
    const texto = await this.findOne(id);

    if (!texto) {
      throw new BadRequestException('Informação não encontrada!');
    }
    
    texto.idSituacao = 2;
    return await this.update(id, texto);
  }
}
