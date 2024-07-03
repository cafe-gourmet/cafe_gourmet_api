import { ApiProperty } from '@nestjs/swagger';

export class SobreNosDTO {
  @ApiProperty()
  descricao: string;
  idSituacao: number;
}
