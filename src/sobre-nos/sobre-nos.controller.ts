import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { SobreNosService } from './sobre-nos.service';
import { SobreNosDTO } from './sobre-nos.dto';
import { ApiBearerAuth, ApiBody, ApiResponse } from '@nestjs/swagger';
import { Public } from 'src/authentication/public.decorator';

@Controller('sobre-nos')
export class SobreNosController {
  constructor(private readonly sobreNosService: SobreNosService) {}

  @Post()
  @ApiBody({ type: SobreNosDTO })
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'Retorna o conteúdo de Sobre Nós recém criado'})
  async create(@Body() data: SobreNosDTO) {
    return this.sobreNosService.create(data);
  }

  @Get('find')
  async findAll() {
    return this.sobreNosService.findAll();
  }

  // @Get('find-one/:id')
  // @Public()
  // async findOne(@Param('id') id: string) {
  //   return this.sobreNosService.findOne(Number(id));
  // }

  @Put(':id')
  @ApiBearerAuth()
  async update(@Param('id') id: number, @Body() data: SobreNosDTO) {
    return this.sobreNosService.update(Number(id), data);
  }

  @Delete(':id')
  @ApiBearerAuth()
  async delete(@Param('id') id: string) {
    return this.sobreNosService.delete(Number(id));
  }
}
