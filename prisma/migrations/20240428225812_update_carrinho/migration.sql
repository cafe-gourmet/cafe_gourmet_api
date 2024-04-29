/*
  Warnings:

  - You are about to drop the column `idCliente` on the `Carrinho` table. All the data in the column will be lost.
  - Added the required column `idUsuario` to the `Carrinho` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Carrinho" DROP COLUMN "idCliente",
ADD COLUMN     "idUsuario" INTEGER NOT NULL;
