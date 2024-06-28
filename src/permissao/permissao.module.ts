import { Module } from '@nestjs/common';
import { PermissaoService } from './permissao.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [],
  providers: [PermissaoService, PrismaService],
})
export class PermissaoModule {}
