import { Injectable } from '@nestjs/common';
import { ClienteService } from 'src/cliente/cliente.service';
import { PrismaService } from 'src/prisma.service';
import { PlanoClienteDTO } from './plano-cliente.dto';

@Injectable()
export class PlanoClienteService {
  constructor(
    private prisma: PrismaService,
    private clienteService: ClienteService,
  ) {}

  async vincular(data: PlanoClienteDTO) {
    const usuario = await this.clienteService.findOne(Number(data.idCliente));
    usuario.planoId = Number(data.idPlano);
    return await this.clienteService.update(Number(data.idCliente), usuario);
  }
  async desvincular(idCliente: number) {
    const usuario = await this.clienteService.findOne(Number(idCliente));
    usuario.planoId = null;
    return await this.clienteService.update(Number(idCliente), usuario);
  }
}
