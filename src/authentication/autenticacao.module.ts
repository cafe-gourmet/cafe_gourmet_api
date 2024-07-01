import { Module } from '@nestjs/common';
import { AutenticacaoController } from './autenticacao.controller';
import { AutenticacaoService } from './autenticacao.service';
import { PrismaService } from 'src/prisma.service';
import { UsuarioModule } from 'src/usuario/usuario.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { APP_GUARD } from '@nestjs/core';
import { AutenticacaoGuard } from './autenticacao.guard';
import { CriptografiaService } from 'src/criptografia/criptografia.service';

@Module({
  controllers: [AutenticacaoController],
  providers: [
    AutenticacaoService,
    PrismaService,
    { provide: APP_GUARD, useClass: AutenticacaoGuard },
    CriptografiaService,
  ],
  imports: [
    UsuarioModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1h' },
    }),
  ],
})
export class AutenticacaoModule {}
