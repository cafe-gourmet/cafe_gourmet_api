import { PrismaService } from 'src/prisma.service';
import { EnderecoDTO } from './endereco.dto';
import { Injectable } from '@nestjs/common';
import { Endereco } from '@prisma/client';

@Injectable()
export class EnderecoService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(endereco: EnderecoDTO): Promise<Endereco> {
    return await this.prismaService.endereco.create({
      data: {
        ...endereco,
        idCliente: endereco.idCliente,
      },
    });
  }

  async delete(enderecoId: number) {
    return await this.prismaService.endereco.delete({
      where: { id: enderecoId },
    });
  }
}
