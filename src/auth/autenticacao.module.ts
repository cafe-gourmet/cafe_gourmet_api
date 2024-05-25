import { Module } from '@nestjs/common';
import { AutenticacaoController } from './autenticacao.controller';
import { AutenticacaoService } from './autenticacao.service';
import { PrismaService } from 'src/prisma.service';
import { UsuarioModule } from 'src/usuario/usuario.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';

@Module({
    controllers:[AutenticacaoController],
    providers: [AutenticacaoService, PrismaService],
    imports: [UsuarioModule, JwtModule.register({
        global: true,
        secret: jwtConstants.secret,
        signOptions: { expiresIn: '1h' },
      }),
    ],
})
export class AutenticacaoModule {}
