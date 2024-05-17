import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { SobreNosService } from './sobre-nos.service';
import { SobreNosDTO } from './sobre-nos.dto';

@Controller('sobre-nos')
export class SobreNosController {
    constructor(private readonly sobreNosService: SobreNosService){}

    @Post()
    async create(@Body() data: SobreNosDTO){
        return this.sobreNosService.create(data);
    }

    @Get('find')
    async findAll() {
        return this.sobreNosService.findAll();
    }

    @Get('find-one/:id')
    async findOne(@Param('id') id: string) {
        return this.sobreNosService.findOne(Number(id));
    }
    
    @Put(':id')
    async update(@Param('id') id: number, @Body() data: SobreNosDTO) {
        return this.sobreNosService.update(Number(id), data);
    }

    @Delete(':id')
    async delete(@Param('id') id: string) {
        return this.sobreNosService.delete(Number(id));
    }
}
