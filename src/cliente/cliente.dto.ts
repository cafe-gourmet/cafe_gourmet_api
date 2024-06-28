import { EnderecoDTO } from 'src/endereco/endereco.dto';

export type ClienteDTO = {
  cpf: string;
  telefone: string;
  planoId?: number | null;
  idUsuario: number;
  endereco?: EnderecoDTO | null;
};
export class ClienteClassDTO {
  cpf: string;
  telefone: string;
  planoId?: number | null;
  idUsuario: number;
  endereco?: EnderecoDTO | null;
}