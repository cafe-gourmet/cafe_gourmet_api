import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { PermissaoDTO } from './permissao.dto';

@Injectable()
export class PermissaoService {

  constructor(private prisma: PrismaService){}

  async create(data: PermissaoDTO){
    const permissao = await this.prisma.permissao.create({
      data,
    })
    return permissao;
  }

  async findOne(idPermissao: number){
    return this.prisma.permissao.findUnique({
      where: {
      id: idPermissao,
      }
    });
  }
  
  async findAll(){
    return this.prisma.permissao.findMany();
  }

  async update(id: number, data: PermissaoDTO) {

    if (!await this.findOne(id)) {
      throw new BadRequestException('Permissao não existe!');
    }

    return await this.prisma.permissao.update({
      data,
      where: {
        id,
      },
    });
  }

  async delete(id: number) {
    const permissao = await this.findOne(id);

    if (!permissao) {
      throw new BadRequestException('Permissao não existe!');
    }
    
    return await this.prisma.permissao.delete({
      where:{
        id,
      }
    });
  }
}