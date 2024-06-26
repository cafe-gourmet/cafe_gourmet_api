import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { UsuarioDTO } from './usuario.dto';

@Controller('usuario')
export class UsuarioController {
    constructor(private readonly usuarioService: UsuarioService){}

    @Post()
    async create(@Body() data: UsuarioDTO){
        return this.usuarioService.create(data);
    }

    @Get('find')
    async findAll() {
        return this.usuarioService.findAll();
    }

    @Get('find-one/:id')
    async findOne(@Param('id') id: string) {
        return this.usuarioService.findOne(Number(id));
    }

    // // http://localhost:3000/238498239472934
    @Put(':id')
    async update(@Param('id') id: number, @Body() data: UsuarioDTO) {
        return this.usuarioService.update(Number(id), data);
    }

    @Delete(':id')
    async delete(@Param('id') id: string) {
        return this.usuarioService.delete(Number(id));
    }
}
