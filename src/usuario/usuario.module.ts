import { Module } from '@nestjs/common';
import { UsuarioController } from './usuario.controller';
import { UsuarioService } from './usuario.service';
import { PrismaService } from 'src/prisma.service';
import { ClienteService } from 'src/cliente/cliente.service';

@Module({
    controllers:[UsuarioController],
    providers: [UsuarioService,PrismaService, ClienteService]

})
export class UsuarioModule {}
