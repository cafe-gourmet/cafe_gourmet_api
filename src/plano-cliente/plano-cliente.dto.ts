import { ApiProperty } from "@nestjs/swagger";

export class PlanoClienteDTO {
  @ApiProperty()
  idCliente: string;
  @ApiProperty()
  idPlano: number;
};
