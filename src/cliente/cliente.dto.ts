export type ClienteDTO = {
  cpf: string;
  telefone: string;
  planoId: number;
  idUsuario: number;
  endereco: EnderecoDTO;
}
export class ClienteClassDTO {
  cpf: string;
  telefone: string;
  planoId: number;
  idUsuario: number;
  endereco: EnderecoDTO;
}
export class EnderecoDTO  {
  cep: string;
  estado: string;
  cidade: string;
  bairro: string;
  rua: string;
  numero: string;
}