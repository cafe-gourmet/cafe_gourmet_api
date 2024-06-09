import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { PlanoController } from './plano.controller';
import { PlanoService } from './plano.service';

@Module({
  controllers: [PlanoController],
  providers: [PlanoService, PrismaService],
})
export class PlanoModule {}
