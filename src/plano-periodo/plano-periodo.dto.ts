import { ApiProperty } from "@nestjs/swagger";

export class PlanoPeriodoDTO {
  @ApiProperty()
  descricao: string;
};
