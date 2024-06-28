import { EnderecoDTO } from 'src/endereco/endereco.dto';

export class UsuarioDTO {
  nomeCompleto: string;
  email: string;
  senha: string;
  fotoPerfil?: string | null;
  idCargo: number;
  idSituacao: number;
  idCliente?: number | null;
}
export type UsuarioClienteDTO = {
  nomeCompleto: string;
  email: string;
  senha: string;
  cpf: string;
  telefone: string;
  endereco: EnderecoDTO;
  fotoPerfil?: string | null;
};
