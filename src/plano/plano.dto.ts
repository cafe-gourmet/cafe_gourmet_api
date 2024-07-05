import { ApiProperty } from '@nestjs/swagger';

export class PlanoDTO {
  @ApiProperty()
  id: number;
  @ApiProperty()
  nome: string;
  @ApiProperty()
  preco: number;
  @ApiProperty()
  descricao: string;
  @ApiProperty()
  idSituacao: number;
  @ApiProperty()
  idPeriodo: number;
  @ApiProperty()
  imgPlano1?: string;
  @ApiProperty()
  imgPlano2?: string;
  @ApiProperty()
  imgPlano3?: string;
}
