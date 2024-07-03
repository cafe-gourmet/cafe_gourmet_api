import { ApiProperty } from '@nestjs/swagger';

export class ContatoDTO {
  @ApiProperty()
  id?: number | null;
  @ApiProperty()
  nome: string;
  @ApiProperty()
  endereco: string;
  @ApiProperty()
  telefone: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  descricao: string;
  @ApiProperty()
  linkGoogleMaps: string;
  @ApiProperty()
  idSituacao?: number | null;
}
