import { Module } from '@nestjs/common';
import { UsuarioController } from './usuario.controller';
import { UsuarioService } from './usuario.service';
import { PrismaService } from 'src/prisma.service';
import { ClienteService } from 'src/cliente/cliente.service';
import { EnderecoModule } from 'src/endereco/endereco.module';
import { CriptografiaService } from 'src/criptografia/criptografia.service';

@Module({
  imports: [EnderecoModule],
  controllers: [UsuarioController],
  providers: [UsuarioService, PrismaService, ClienteService, CriptografiaService],
  exports: [UsuarioService],
})
export class UsuarioModule {}
