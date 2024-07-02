export type CarrinhoDTO = {
  id: number | null;
  idProduto: number | null;
  idPlano: number | null;
  idCliente: number;
  qntProduto: number | null;
  statusCompra: boolean | null;
  statusCarrinho: boolean | null;
};
