import { Injectable } from '@nestjs/common';
 import * as bcrypt from 'bcrypt';


@Injectable()
export class CriptografiaService {
  async encriptografar(texto: string): Promise<string> {
    const saltOrRounds = await bcrypt.genSalt();
    const hash = await bcrypt.hash(texto, saltOrRounds);
    return hash;
  }
  
  async verificar(senha: string, hash: string): Promise<boolean> {
    var senhaCrip = await this.encriptografar(senha);
    return senhaCrip == hash;
  }
}