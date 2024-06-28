export type ProdutoDTO = {
  nome: string;
  marca: string;
  preco: number;
  codigoBarras: string;
  idCategoria: number;
  quantidade: number;
  percentualDescontoMensal: number;
  percentualDescontoAnual: number;
  imgProduto1?: string;
  imgProduto2?: string;
  imgProduto3?: string;
};
