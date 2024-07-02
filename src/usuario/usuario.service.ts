import { BadRequestException, Injectable } from '@nestjs/common';
import { ClienteService } from 'src/cliente/cliente.service';
import { CriptografiaService } from 'src/criptografia/criptografia.service';
import { PrismaService } from '../prisma.service';
import { UsuarioClienteDTO, UsuarioDTO } from './usuario.dto';

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
    return this.prisma.usuario.findMany({
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
      include: {
        cliente: {
          include: {
            endereco: true,
          },
        },
        cargo: true,
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

  async update(data: UsuarioClienteDTO) {
    const usuarioExiste = await this.findOne(data.email);

    if (!usuarioExiste) {
      throw new BadRequestException('Usuário não existe!');
    }

    const usuarioAtualizado = await this.prisma.usuario.update({
      data: {
        nomeCompleto: data.nomeCompleto,
        email: data.email,
        senha: await this.criptografiaService.encriptografar(data.senha),
        idCargo: 2,
        idSituacao: 1,
        fotoPerfil: data.fotoPerfil,
      },
      include: {
        cliente: { include: { endereco: true } },
        cargo: true,
      },
      where: {
        id: data.id,
      },
    });
    this.clienteService.update(usuarioAtualizado.cliente.id, {
      cpf: data.cpf,
      telefone: data.telefone,
      idUsuario: data.id,
      endereco: {
        cep: data.endereco.cep,
        estado: data.endereco.estado,
        cidade: data.endereco.cidade,
        bairro: data.endereco.bairro,
        rua: data.endereco.rua,
        numero: data.endereco.numero,
      },
    });
    return usuarioAtualizado;
  }

  async createUser(dados: UsuarioDTO) {
    const usuario = await this.prisma.usuario.create({
      data: {
        nomeCompleto: dados.nomeCompleto,
        email: dados.email,
        senha: await this.criptografiaService.encriptografar(dados.senha),
        idCargo: dados.idCargo,
        idSituacao: 1,
        fotoPerfil: dados.fotoPerfil,
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

    if (dados.cliente?.cpf) {
      const cliente = await this.clienteService.create({
        cpf: dados.cliente.cpf,
        telefone: dados.cliente.telefone,
        planoId: dados.cliente.planoId,
        idUsuario: usuario.id,
        endereco: {
          cep: dados.cliente.endereco.cep,
          estado: dados.cliente.endereco.estado,
          cidade: dados.cliente.endereco.cidade,
          bairro: dados.cliente.endereco.bairro,
          rua: dados.cliente.endereco.rua,
          numero: dados.cliente.endereco.numero,
        },
      });
      usuario.cliente = cliente;
    }

    return usuario;
  }

  async updateUser(data: UsuarioDTO) {
    const usuarioExiste = await this.findOne(data.email);

    if (!usuarioExiste) {
      throw new BadRequestException('Usuário não existe!');
    }

    const usuarioAtualizado = await this.prisma.usuario.update({
      data: {
        nomeCompleto: data.nomeCompleto,
        email: data.email,
        senha: await this.changePassword(usuarioExiste.senha, data.senha),
        idCargo: data.idCargo,
        idSituacao: 1,
        fotoPerfil: data.fotoPerfil,
      },
      include: {
        cliente: { include: { endereco: true } },
        cargo: true,
      },
      where: {
        id: data.id,
      },
    });

    if (data.cliente?.cpf) {
      const cliente = await this.clienteService.update(
        usuarioAtualizado.cliente.id,
        {
          cpf: data.cliente.cpf,
          telefone: data.cliente.telefone,
          idUsuario: data.id,
          endereco: {
            cep: data.cliente.endereco.cep,
            estado: data.cliente.endereco.estado,
            cidade: data.cliente.endereco.cidade,
            bairro: data.cliente.endereco.bairro,
            rua: data.cliente.endereco.rua,
            numero: data.cliente.endereco.numero,
          },
          planoId: data.cliente.planoId,
        },
      );
      usuarioAtualizado.cliente = cliente;
    }

    return usuarioAtualizado;
  }

  async delete(id: number) {
    const usuario = await this.prisma.usuario.findFirst({
      where: { id },
      include: { cliente: true },
    });

    if (!usuario) {
      throw new BadRequestException('Usuário não existe!');
    }

    const usuarioAtualizado = await this.prisma.usuario.update({
      data: {
        idSituacao: 2,
      },
      where: { id: usuario.id },
      include: {
        cliente: { include: { endereco: true } },
        cargo: true,
      },
    });

    return usuarioAtualizado;
  }

  private async changePassword(
    encriptedPassowrd: string,
    newPassowrd: string,
  ): Promise<string> {
    if (encriptedPassowrd === newPassowrd) return encriptedPassowrd;
    return await this.criptografiaService.encriptografar(newPassowrd);
  }
}
