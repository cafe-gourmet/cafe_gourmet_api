import { PrismaService } from 'src/prisma.service';
import { EnderecoService } from './endereco.service';
import { Module } from '@nestjs/common';
import { EnderecoController } from './endereco.controller';

@Module({
  controllers: [EnderecoController],
  providers: [EnderecoService, PrismaService],
  exports: [EnderecoService],
})
export class EnderecoModule {}
