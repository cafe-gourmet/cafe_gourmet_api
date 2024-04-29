export type UsuarioDTO = {
    nomeCompleto: string
    email: string
    senha: string
    fotoPerfil?: Buffer | null
    idCargo: number
    idSituacao: number
    idCliente?: number | null
}