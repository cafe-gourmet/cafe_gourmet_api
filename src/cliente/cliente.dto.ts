import { EnderecoDTO } from 'src/endereco/endereco.dto';

export type ClienteDTO = {
  cpf: string;
  telefone: string;
  planoId: number;
  idUsuario: number;
  endereco: EnderecoDTO;
};
export class ClienteClassDTO {
  cpf: string;
  telefone: string;
  planoId: number;
  idUsuario: number;
  endereco: EnderecoDTO;
}
