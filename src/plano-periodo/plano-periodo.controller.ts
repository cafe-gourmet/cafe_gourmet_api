import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { PlanoPeriodoDTO } from './plano-periodo.dto';
import { PlanoPeriodoService } from './plano-periodo.service';
import { ApiBearerAuth, ApiBody, ApiResponse } from '@nestjs/swagger';

@Controller('plano-periodo')
@ApiBearerAuth()
export class PlanoPeriodoController {
  constructor(private readonly planoPeriodoService: PlanoPeriodoService) {}

  @Post()
  @ApiBody({ type: PlanoPeriodoDTO })
  @ApiResponse({ status: 200, description: 'Retorna o período recém criado', type: PlanoPeriodoDTO})
  async create(@Body() data: PlanoPeriodoDTO) {
    return this.planoPeriodoService.create(data);
  }

  @Get('find')
  async findAll() {
    return this.planoPeriodoService.findAll();
  }
}
