import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { SituacaoDTO } from './situacao.dto';

@Injectable()
export class SituacaoService {

  constructor(private prisma: PrismaService){}

  async create(data: SituacaoDTO){
    const situacao = await this.prisma.situacao.create({
      data,
    })
    return situacao;
  }

}