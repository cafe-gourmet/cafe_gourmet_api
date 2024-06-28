import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { PlanoClienteDTO } from './plano-cliente.dto';
import { ClienteService } from 'src/cliente/cliente.service';

@Injectable()
export class PlanoClienteService {
  constructor(private prisma: PrismaService, private clienteService: ClienteService) {}

  async vincular(data: PlanoClienteDTO) {
    var usuario = await this.clienteService.findOne(Number(data.idCliente));
    usuario.planoId = Number(data.idPlano);
    return await this.clienteService.update(Number(data.idCliente), usuario);
  }
  async desvincular(idCliente: number) {
    var usuario = await this.clienteService.findOne(Number(idCliente));
    usuario.planoId = null;
    return await this.clienteService.update(Number(idCliente), usuario);
  }
}
