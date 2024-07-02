import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiResponse } from '@nestjs/swagger';
import { Public } from '../authentication/public.decorator';
import { UsuarioClienteDTO, UsuarioDTO } from './usuario.dto';
import { UsuarioService } from './usuario.service';

@Controller('usuario')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Post()
  @Public()
  @ApiBody({ type: UsuarioClienteDTO })
  @ApiResponse({
    status: 200,
    description: 'Devolve o usuário recém criado',
    type: UsuarioDTO,
  })
  async create(@Body() data: UsuarioClienteDTO) {
    return await this.usuarioService.create(data);
  }

  @ApiBearerAuth()
  @Post('create-user')
  async createUser(@Body() data: UsuarioDTO) {
    return await this.usuarioService.createUser(data);
  }

  @ApiBearerAuth()
  @Put('update-user')
  async updateUser(@Body() data: UsuarioDTO) {
    return await this.usuarioService.updateUser(data);
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

  @Delete(':id')
  @ApiBearerAuth()
  async delete(@Param('id') id: string) {
    return this.usuarioService.delete(Number(id));
  }
}
