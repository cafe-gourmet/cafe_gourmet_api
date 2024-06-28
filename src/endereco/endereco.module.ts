import { PrismaService } from 'src/prisma.service';
import { EnderecoService } from './endereco.service';
import { Module } from '@nestjs/common';

@Module({
  controllers: [],
  providers: [EnderecoService, PrismaService],
  exports: [EnderecoService],
})
export class EnderecoModule {}
