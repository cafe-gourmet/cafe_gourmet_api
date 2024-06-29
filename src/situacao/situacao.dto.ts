import { ApiProperty } from '@nestjs/swagger';

export class SituacaoDTO {
  @ApiProperty()
  descricao: string;
}
