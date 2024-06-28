import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { UsuarioClienteDTO, UsuarioDTO } from './usuario.dto';
import { UsuarioService } from './usuario.service';
import { Public } from '../authentication/public.decorator';
import { ApiBearerAuth, ApiBody, ApiResponse } from '@nestjs/swagger';

@Controller('usuario')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Post()
  @Public()
  @ApiBody({ type: UsuarioClienteDTO })
  @ApiResponse({ status: 200, description: 'Devolve o usuário recém criado', type: UsuarioDTO })
  async create(@Body() data: UsuarioClienteDTO): Promise<UsuarioDTO> {
    return this.usuarioService.create(data);
  }
  
  @ApiBearerAuth()
  @Get('find')
  async findAll() {
    return this.usuarioService.findAll();
  }

  @Get('find-one/:email')
  @ApiBearerAuth()
  async findOne(@Param('email') email: string) {
    return this.usuarioService.findOne(email);
  }

  @Put()
  async update(@Body() data: UsuarioClienteDTO) {
      return this.usuarioService.update(data);
  }

  // @Delete(':id')
  // async delete(@Param('id') id: string) {
  //     return this.usuarioService.delete(Number(id));
  // }
}
