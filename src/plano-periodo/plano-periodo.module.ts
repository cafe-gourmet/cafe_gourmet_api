import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { PlanoPeriodoController } from './plano-periodo.controller';
import { PlanoPeriodoService } from './plano-periodo.service';

@Module({
    controllers:[PlanoPeriodoController],
    providers: [PlanoPeriodoService, PrismaService]

})
export class PlanoPeriodoModule {}
