import {
  Controller,
  Delete,
  InternalServerErrorException,
  Logger,
  Param,
} from '@nestjs/common';
import { EnderecoService } from './endereco.service';

@Controller('endereco')
export class EnderecoController {
  private readonly logger = new Logger(EnderecoController.name);

  constructor(private readonly enderecoService: EnderecoService) {}

  @Delete(':/id')
  async delete(@Param('id') id: string) {
    try {
      return await this.enderecoService.delete(Number(id));
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException(
        'Ocorreu um erro ao excluir o endereço no banco de dados.',
      );
    }
  }
}
