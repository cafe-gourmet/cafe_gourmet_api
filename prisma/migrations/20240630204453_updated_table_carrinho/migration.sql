-- AlterTable
ALTER TABLE "Carrinho" ADD COLUMN     "idPlano" INTEGER,
ADD COLUMN     "status" BOOLEAN,
ALTER COLUMN "idProduto" DROP NOT NULL,
ALTER COLUMN "qntProduto" DROP NOT NULL;
