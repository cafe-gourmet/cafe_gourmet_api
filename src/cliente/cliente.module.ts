import { Module } from '@nestjs/common';
import { ClienteService } from './cliente.service';
import { PrismaService } from 'src/prisma.service';
import { EnderecoModule } from 'src/endereco/endereco.module';

@Module({
  imports: [EnderecoModule],
  controllers: [],
  providers: [ClienteService, PrismaService],
  exports: [ClienteService],
})
export class ClienteModule {}
