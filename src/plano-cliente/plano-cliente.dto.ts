import { ApiProperty } from "@nestjs/swagger";

export class PlanoClienteDTO {
  @ApiProperty()
  idCliente: number;
  @ApiProperty()
  idPlano: number;
};
