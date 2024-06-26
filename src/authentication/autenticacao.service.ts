import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CriptografiaService } from 'src/criptografia/criptografia.service';
import { UsuarioService } from 'src/usuario/usuario.service';

@Injectable()
export class AutenticacaoService {
  constructor(
    private usuarioService: UsuarioService,
    private jwtService: JwtService,
    private criptografiaService: CriptografiaService
  ) {}

  async signIn(
    email: string,
    senha: string,
  ): Promise<{ access_token: string }> {
    const user = await this.usuarioService.findOne(email);

    if (await this.criptografiaService.verificar(senha,user.senha)) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.email, username: user.senha };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
