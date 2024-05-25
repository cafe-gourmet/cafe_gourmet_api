import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CarrinhoModule } from './carrinho/carrinho.module';
import { CargoModule } from './cargo/cargo.module';
import { SituacaoModule } from './situacao/situacao.module';
import { UsuarioModule } from './usuario/usuario.module';
import { PlanoPeriodoModule } from './plano-periodo/plano-periodo.module';
import { PlanoModule } from './plano/plano.module';
import { ClienteModule } from './cliente/cliente.module';
import { CategoriaModule } from './categoria/categoria.module';
import { ProdutoModule } from './produto/produto.module';
import { PermissaoModule } from './permissao/permissao.module';
import { SobreNosModule } from './sobre-nos/sobre-nos.module';
import { AutenticacaoModule } from './auth/autenticacao.module';

@Module({
  imports: [CarrinhoModule, CargoModule, SituacaoModule, UsuarioModule, PlanoPeriodoModule, 
    PlanoModule, ClienteModule, CategoriaModule,ProdutoModule, PermissaoModule, SobreNosModule,
    AutenticacaoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
