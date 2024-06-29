import { ApiProperty } from '@nestjs/swagger';

export class AutenticacaoDTO {
  @ApiProperty()
  email: string;
  @ApiProperty()
  senha: string;
}
