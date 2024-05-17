import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { SobreNosController } from './sobre-nos.controller';
import { SobreNosService } from './sobre-nos.service';

@Module({
    controllers:[SobreNosController],
    providers: [SobreNosService, PrismaService]

})
export class SobreNosModule {}
