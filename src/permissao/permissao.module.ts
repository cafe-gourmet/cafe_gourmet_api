import { Module } from '@nestjs/common';
import { PermissaoController } from './permissao.controller';
import { PermissaoService } from './permissao.service';
import { PrismaService } from 'src/prisma.service';

@Module({
    controllers:[PermissaoController],
    providers: [PermissaoService, PrismaService]

})
export class PermissaoModule {}
