import { ApiProperty } from '@nestjs/swagger';

export class ProdutoDTO {
  @ApiProperty()
  nome: string;
  @ApiProperty()
  marca: string;
  @ApiProperty()
  preco: number;
  @ApiProperty()
  codigoBarras: string;
  @ApiProperty()
  idCategoria: number;
  @ApiProperty()
  quantidade: number;
  @ApiProperty()
  percentualDescontoMensal: number;
  @ApiProperty()
  percentualDescontoAnual: number;
  @ApiProperty()
  imgProduto1?: string;
  @ApiProperty()
  imgProduto2?: string;
  @ApiProperty()
  imgProduto3?: string;
}
