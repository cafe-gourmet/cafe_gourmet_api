import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Usuario, Prisma } from '@prisma/client';
import { UsuarioDTO } from './usuario.dto';

@Injectable()
export class UsuarioService {
  constructor(private prisma: PrismaService) {}

  async findOne(idUsuario: number){
    return this.prisma.usuario.findUnique({
      where: {
      id: idUsuario,
      }
    });
  }
  
  async findAll(){
    return this.prisma.usuario.findMany();
  }

  async create(data: UsuarioDTO){
    const usuario = await this.prisma.usuario.create({
      data,
    })
    return usuario;
  }
  async update(id: number, data: UsuarioDTO) {
    const usuarioExiste = await this.findOne(id);

    if (!usuarioExiste) {
      throw new Error('Usuário não existe!');
    }

    return await this.prisma.usuario.update({
      data,
      where: {
        id,
      },
    });
  }

  async delete(id: number) {
    const usuario = await this.findOne(id);

    if (!usuario) {
      throw new Error('Usuário não existe!');
    }
    //vou criar um enum depois pra tratar as situações. 1- ativo, 2- inativo;
    usuario.idSituacao = 2;

    return await this.update(id, usuario);
  }
}
