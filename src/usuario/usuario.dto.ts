export class UsuarioDTO {
    nomeCompleto: string
    email: string
    senha: string
    fotoPerfil?: Buffer | null
    idCargo: number
    idSituacao: number
    idCliente?: number | null
}
export type UsuarioClienteDTO = {
    nomeCompleto: string
    email: string
    senha: string
    cpf: string
    telefone: string
    fotoPerfil?: Buffer | null
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