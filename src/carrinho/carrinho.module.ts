import { Module } from '@nestjs/common';
import { CarrinhoController } from './carrinho.controller';
import { CarrinhoService } from './carrinho.service';
import { PrismaService } from 'src/prisma.service';
import { PlanoClienteModule } from 'src/plano-cliente/plano-cliente.module';

@Module({
  controllers: [CarrinhoController],
  providers: [CarrinhoService, PrismaService],
  imports: [PlanoClienteModule],
})
export class CarrinhoModule {}
