import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { ClienteClassDTO } from './cliente.dto';
import { EnderecoService } from 'src/endereco/endereco.service';
import { Cliente, Endereco } from '@prisma/client';

@Injectable()
export class ClienteService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly enderecoService: EnderecoService,
  ) {}

  async create(dados: ClienteClassDTO) {
    const cliente: Cliente = await this.prisma.cliente.create({
      data: {
        cpf: dados.cpf,
        telefone: dados.telefone,
        idUsuario: dados.idUsuario,
        planoId: null,
      },
    });

    const endereco: Endereco = await this.enderecoService.create({
      cep: dados.endereco.cep,
      estado: dados.endereco.estado,
      cidade: dados.endereco.cidade,
      bairro: dados.endereco.bairro,
      rua: dados.endereco.rua,
      numero: dados.endereco.numero,
      idCliente: cliente.id,
    });

    return { ...cliente, endereco: endereco };
  }

  async findOne(idUsuario: number) {
    return this.prisma.cliente.findUnique({
      where: {
        id: idUsuario,
      },
    });
  }

  async findAll() {
    return this.prisma.cliente.findMany();
  }

  // async update(id: number, data: ClienteDTO) {
  //   const cliente = await this.findOne(id);

  //   if (!cliente) {
  //     throw new BadRequestException('Cliente não existe!');
  //   }

  //   return await this.prisma.cliente.update({
  //     data,
  //     where: {
  //       id,
  //     },
  //   });
  // }

  async delete(idUsuario: number) {
    const cliente = await this.findOne(idUsuario);

    if (!cliente) {
      throw new BadRequestException('Cliente não existe!');
    }

    return await this.prisma.cliente.delete({
      where: {
        id: idUsuario,
      },
    });
  }
}
