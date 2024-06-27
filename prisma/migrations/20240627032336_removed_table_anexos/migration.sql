/*
  Warnings:

  - You are about to drop the `Anexo` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Anexo" DROP CONSTRAINT "Anexo_idPlano_fkey";

-- DropForeignKey
ALTER TABLE "Anexo" DROP CONSTRAINT "Anexo_idProduto_fkey";

-- AlterTable
ALTER TABLE "Plano" ADD COLUMN     "imgPlano1" TEXT,
ADD COLUMN     "imgPlano2" TEXT,
ADD COLUMN     "imgPlano3" TEXT;

-- AlterTable
ALTER TABLE "Produto" ADD COLUMN     "imgProduto1" TEXT,
ADD COLUMN     "imgProduto2" TEXT,
ADD COLUMN     "imgProduto3" TEXT;

-- DropTable
DROP TABLE "Anexo";
