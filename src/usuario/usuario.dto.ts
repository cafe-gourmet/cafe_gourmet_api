import { ApiProperty } from '@nestjs/swagger';
import { EnderecoDTO } from 'src/endereco/endereco.dto';

export class UsuarioDTO {
  id: number;
  nomeCompleto: string;
  email: string;
  senha: string;
  fotoPerfil?: string | null;
  idCargo: number;
  idSituacao: number;
  idCliente?: number | null;
}
export class UsuarioClienteDTO {
  @ApiProperty()
  id?: number | null;
  @ApiProperty()
  nomeCompleto: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  senha: string;
  @ApiProperty()
  cpf: string;
  @ApiProperty()
  telefone: string;
  @ApiProperty()
  endereco: EnderecoDTO;
  @ApiProperty()
  fotoPerfil?: string | null;
}
