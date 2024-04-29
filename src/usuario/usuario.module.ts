import { Module } from '@nestjs/common';
import { UsuarioController } from './usuario.controller';
import { UsuarioService } from './usuario.service';
import { PrismaService } from 'src/prisma.service';

@Module({
    controllers:[UsuarioController],
    providers: [UsuarioService,PrismaService]

})
export class UsuarioModule {}
