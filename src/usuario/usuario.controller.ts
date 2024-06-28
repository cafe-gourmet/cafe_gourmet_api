import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UsuarioClienteDTO } from './usuario.dto';
import { UsuarioService } from './usuario.service';
import { Public } from '../authentication/public.decorator';

@Controller('usuario')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Post()
  @Public()
  async create(@Body() data: UsuarioClienteDTO) {
    return this.usuarioService.create(data);
  }

  @Get('find')
  async findAll() {
    return this.usuarioService.findAll();
  }

  @Get('find-one/:email')
  async findOne(@Param('email') email: string) {
    return this.usuarioService.findOne(email);
  }

  // @Put(':id')
  // async update(@Param('id') id: number, @Body() data: UsuarioDTO) {
  //     return this.usuarioService.update(Number(id), data);
  // }

  // @Delete(':id')
  // async delete(@Param('id') id: string) {
  //     return this.usuarioService.delete(Number(id));
  // }
}
