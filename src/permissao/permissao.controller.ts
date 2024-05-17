import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { PermissaoService } from './permissao.service';
import { PermissaoDTO } from './permissao.dto';

@Controller('permissao')
export class PermissaoController {
    categoriaService: any;
    constructor(private readonly permissaoService: PermissaoService){}

    @Post()
    async create(@Body() data: PermissaoDTO){
        return this.permissaoService.create(data);
    }
    
    @Get('find')
    async findAll() {
        return this.permissaoService.findAll();
    }

    @Get('find-one/:id')
    async findOne(@Param('id') id: string) {
        return this.permissaoService.findOne(Number(id));
    }
    
    @Put(':id')
    async update(@Param('id') id: number, @Body() data: PermissaoDTO) {
        return this.permissaoService.update(Number(id), data);
    }

    @Delete(':id')
    async delete(@Param('id') id: string) {
        return this.permissaoService.delete(Number(id));
    }
}
