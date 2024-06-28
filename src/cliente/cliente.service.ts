import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { ClienteClassDTO, ClienteDTO } from './cliente.dto';
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

  async findOne(idCliente: number) {
    return this.prisma.cliente.findUnique({
      where: {
        id: idCliente,
      },
      include: {
        endereco: true,
        plano: true
      }
    });
  }

  async findAll() {
    return this.prisma.cliente.findMany();
  }

  async update(id: number, data: ClienteDTO) {
    const clienteResult = await this.findOne(id);
    if (!clienteResult) {
      throw new BadRequestException('Cliente não existe!');
    }
    return await this.prisma.cliente.update({
      data: {
        cpf: data.cpf,
        telefone: data.telefone,
        planoId: data.planoId,
        idUsuario: data.idUsuario,
        endereco: { 
          update: {
            cep: data.endereco.cep,
            estado: data.endereco.estado,
            cidade: data.endereco.cidade,
            bairro: data.endereco.bairro,
            rua: data.endereco.rua,
            numero: data.endereco.numero
          } 
        }
      },
      include: {
        endereco:true,
        usuario:true
      },
      where: {
        id,
      },
    });
  }

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
