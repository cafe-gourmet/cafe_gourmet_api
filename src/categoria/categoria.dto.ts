import { ApiProperty } from '@nestjs/swagger';

export class CategoriaDTO {
  @ApiProperty()
  nome: string;
}
