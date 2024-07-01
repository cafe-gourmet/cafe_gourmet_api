/*
  Warnings:

  - You are about to drop the column `status` on the `Carrinho` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Carrinho" DROP COLUMN "status",
ADD COLUMN     "statusCarrinho" BOOLEAN,
ADD COLUMN     "statusCompra" BOOLEAN;
