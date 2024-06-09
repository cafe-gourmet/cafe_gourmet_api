import { Module } from '@nestjs/common';
import { CargoController } from './cargo.controller';
import { CargoService } from './cargo.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [CargoController],
  providers: [CargoService, PrismaService],
})
export class CargoModule {}
