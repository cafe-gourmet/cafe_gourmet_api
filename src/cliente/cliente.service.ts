import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Cliente, Prisma } from '@prisma/client';
import { ClienteDTO,ClienteClassDTO} from './cliente.dto';

@Injectable()
export class ClienteService {
  constructor(private prisma: PrismaService) {}

  async create(dados: ClienteClassDTO){
    //verificar se o usuário ta ativo antes de criar
    const cliente = await this.prisma.cliente.create({
      data:{
        cpf: dados.cpf,
        telefone: dados.telefone,
        idUsuario: dados.idUsuario,
        planoId:null,
        endereco: {
          create:{
            cep: dados.endereco.cep,
            estado: dados.endereco.estado,
            cidade: dados.endereco.cidade,
            bairro: dados.endereco.bairro,
            rua: dados.endereco.rua,
            numero: dados.endereco.numero
          }
        }
      },
      include:{
        endereco: true
      }
    });
    return cliente;
  }
  async findOne(idUsuario: number){
    return this.prisma.cliente.findUnique({
      where: {
      id: idUsuario,
      }
    });
  }
  
  async findAll(){
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
      }
    });
    }
}
