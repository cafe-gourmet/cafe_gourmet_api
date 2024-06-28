import { Injectable } from '@nestjs/common';
import { ClienteService } from 'src/cliente/cliente.service';
import { PrismaService } from '../prisma.service';
import { UsuarioClienteDTO } from './usuario.dto';
import { CriptografiaService } from 'src/criptografia/criptografia.service';

@Injectable()
export class UsuarioService {
  constructor(
    private prisma: PrismaService,
    private clienteService: ClienteService,
    private criptografiaService: CriptografiaService,
  ) {}

  async findOne(email: string) {
    return this.prisma.usuario.findFirst({
      where: {
        email: email,
      },
      include: {
        cliente: {
          include: {
          endereco: true,
          },
        },
        cargo: true,
      },
    });
  }

  async findAll() {
    return this.prisma.usuario.findMany();
  }

  async create(dados: UsuarioClienteDTO) {
    const usuario = await this.prisma.usuario.create({
      data: {
        nomeCompleto: dados.nomeCompleto,
        email: dados.email,
        senha: await this.criptografiaService.encriptografar(dados.senha),
        idCargo: 2,
        idSituacao: 1,
        fotoPerfil: dados.fotoPerfil,
      },
    });

    this.clienteService.create({
      cpf: dados.cpf,
      telefone: dados.telefone,
      planoId: 0,
      idUsuario: usuario.id,
      endereco: {
        cep: dados.endereco.cep,
        estado: dados.endereco.estado,
        cidade: dados.endereco.cidade,
        bairro: dados.endereco.bairro,
        rua: dados.endereco.rua,
        numero: dados.endereco.numero,
      },
    });

    return usuario;
  }
  // async update(id: number, data: UsuarioDTO) {
  //   const usuarioExiste = await this.findOne(id);

  //   if (!usuarioExiste) {
  //     throw new BadRequestException('Usuário não existe!');
  //   }

  //   return await this.prisma.usuario.update({
  //     data,
  //     where: {
  //       id,
  //     },
  //   });
  // }

  // async delete(id: number) {
  //   const usuario = await this.findOne(id);

  //   if (!usuario) {
  //     throw new BadRequestException('Usuário não existe!');
  //   }
  //   //vou criar um enum depois pra tratar as situações. 1- ativo, 2- inativo;
  //   usuario.idSituacao = 2;

  //   return await this.update(id, usuario);
  // }
}
