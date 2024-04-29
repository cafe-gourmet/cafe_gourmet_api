import { Module } from '@nestjs/common';
import { SituacaoController } from './situacao.controller';
import { SituacaoService } from './situacao.service';
import { PrismaService } from 'src/prisma.service';

@Module({
    controllers:[SituacaoController],
    providers: [SituacaoService, PrismaService]

})
export class SituacaoModule {}
