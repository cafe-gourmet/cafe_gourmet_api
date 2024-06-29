import { ApiProperty } from '@nestjs/swagger';

export class EnderecoDTO {
  @ApiProperty()
  cep: string;
  @ApiProperty()
  estado: string;
  @ApiProperty()
  cidade: string;
  @ApiProperty()
  bairro: string;
  @ApiProperty()
  rua: string;
  @ApiProperty()
  numero: string;
  @ApiProperty()
  idCliente?: number;
}
