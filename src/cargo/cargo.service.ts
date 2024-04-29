import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CargoDTO } from './cargo.dto';

@Injectable()
export class CargoService {

  constructor(private prisma: PrismaService){}

  async create(data: CargoDTO){
    const cargo = await this.prisma.cargo.create({
      data,
    })
    return cargo;
  }

}