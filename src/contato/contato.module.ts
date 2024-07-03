import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { ContatoController } from './contato.controller';
import { ContatoService } from './contato.service';

@Module({
  controllers: [ContatoController],
  providers: [ContatoService, PrismaService],
})
export class ContatoModule {}
