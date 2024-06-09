import { Module } from '@nestjs/common';
import { ClienteController } from './cliente.controller';
import { ClienteService } from './cliente.service';
import { PrismaService } from 'src/prisma.service';
import { EnderecoModule } from 'src/endereco/endereco.module';

@Module({
  imports: [EnderecoModule],
  controllers: [ClienteController],
  providers: [ClienteService, PrismaService],
  exports: [ClienteService],
})
export class ClienteModule {}
