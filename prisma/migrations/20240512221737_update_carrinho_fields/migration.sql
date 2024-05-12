/*
  Warnings:

  - The primary key for the `Carrinho` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Carrinho` table. All the data in the column will be lost.
  - You are about to drop the column `idPlano` on the `Carrinho` table. All the data in the column will be lost.
  - You are about to drop the column `idUsuario` on the `Carrinho` table. All the data in the column will be lost.
  - Added the required column `idCliente` to the `Carrinho` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Carrinho" DROP CONSTRAINT "Carrinho_pkey",
DROP COLUMN "id",
DROP COLUMN "idPlano",
DROP COLUMN "idUsuario",
ADD COLUMN     "idCliente" INTEGER NOT NULL,
ADD CONSTRAINT "Carrinho_pkey" PRIMARY KEY ("idProduto", "idCliente");
