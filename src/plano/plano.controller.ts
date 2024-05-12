import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { PlanoDTO } from './plano.dto';
import { PlanoService } from './plano.service';

@Controller('plano')
export class PlanoController {
    constructor(private readonly planoService: PlanoService){}

    @Post()
    async create(@Body() data: PlanoDTO){
        return this.planoService.create(data);
    }

    @Get('find')
    async findAll() {
        return this.planoService.findAll();
    }

    @Get('find-one/:id')
    async findOne(@Param('id') id: string) {
        return this.planoService.findOne(Number(id));
    }
    
    @Put(':id')
    async update(@Param('id') id: number, @Body() data: PlanoDTO) {
        return this.planoService.update(Number(id), data);
    }

    @Delete(':id')
    async delete(@Param('id') id: string) {
        return this.planoService.delete(Number(id));
    }
}
