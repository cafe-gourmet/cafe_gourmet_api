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
    const isMatch = await bcrypt.compare(senha, hash);
    return isMatch;
  }
}
