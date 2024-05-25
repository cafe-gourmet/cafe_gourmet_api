import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsuarioService } from 'src/usuario/usuario.service';

@Injectable()
export class AutenticacaoService {

  constructor(private usuarioService: UsuarioService,private jwtService: JwtService){}

  async signIn(email: string, senha: string,): Promise<{ access_token: string }> {
    const user = await this.usuarioService.findOne(email);
    if (user?.senha !== senha) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.email, username: user.senha };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}