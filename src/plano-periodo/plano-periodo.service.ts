import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { PlanoPeriodoDTO } from './plano-periodo.dto';

@Injectable()
export class PlanoPeriodoService {

  constructor(private prisma: PrismaService){}

  async findOne(idPlanoPeriodo: number){
    return this.prisma.planoPeriodo.findUnique({
      where: {
      id: idPlanoPeriodo,
      }
    });
  }
  
  async findAll(){
    return this.prisma.planoPeriodo.findMany();
  }

  async create(data: PlanoPeriodoDTO){
    const planoPeriodo = await this.prisma.planoPeriodo.create({
      data,
    })
    return planoPeriodo;
  }
  async update(id: number, data: PlanoPeriodoDTO) {

    if (!await this.findOne(id)) {
      throw new BadRequestException('Usuário não existe!');
    }

    return await this.prisma.planoPeriodo.update({
      data,
      where: {
        id,
      },
    });
  }

  async delete(id: number) {
    const planoPeriodo = await this.findOne(id);

    if (!planoPeriodo) {
      throw new BadRequestException('Usuário não existe!');
    }

    return await this.prisma.planoPeriodo.delete({
      where:{
        id,
      }
    });
  }
}