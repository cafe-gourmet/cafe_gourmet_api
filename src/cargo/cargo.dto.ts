import { ApiProperty } from '@nestjs/swagger';

export class CargoDTO {
  @ApiProperty()
  nome: string;
  @ApiProperty()
  idSituacao: number;
}
