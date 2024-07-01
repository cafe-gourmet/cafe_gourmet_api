import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { PlanoClienteController } from './plano-cliente.controller';
import { PlanoClienteService } from './plano-cliente.service';
import { ClienteModule } from 'src/cliente/cliente.module';

@Module({
  controllers: [PlanoClienteController],
  providers: [PlanoClienteService, PrismaService],
  imports: [ClienteModule],
  exports: [PlanoClienteService]
})
export class PlanoClienteModule {}
