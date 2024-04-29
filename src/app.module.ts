import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CarrinhoModule } from './carrinho/carrinho.module';
import { CargoModule } from './cargo/cargo.module';
import { SituacaoModule } from './situacao/situacao.module';
import { UsuarioModule } from './usuario/usuario.module';

@Module({
  imports: [CarrinhoModule, CargoModule, SituacaoModule, UsuarioModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
