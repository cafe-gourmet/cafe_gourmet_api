/*
  Warnings:

  - The primary key for the `Carrinho` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "Carrinho" DROP CONSTRAINT "Carrinho_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Carrinho_pkey" PRIMARY KEY ("id");
