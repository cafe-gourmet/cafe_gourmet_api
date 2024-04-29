import { Body, Controller, Post } from '@nestjs/common';
import { CargoService } from './cargo.service';
import { CargoDTO } from './cargo.dto';

@Controller('cargo')
export class CargoController {
    constructor(private readonly cargoService: CargoService){}

    @Post()
    async create(@Body() data: CargoDTO){
        return this.cargoService.create(data);
    }

}
