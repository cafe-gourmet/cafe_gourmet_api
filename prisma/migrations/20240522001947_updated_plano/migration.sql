-- DropForeignKey
ALTER TABLE "Cliente" DROP CONSTRAINT "Cliente_planoId_fkey";

-- AlterTable
ALTER TABLE "Cliente" ALTER COLUMN "planoId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Cliente" ADD CONSTRAINT "Cliente_planoId_fkey" FOREIGN KEY ("planoId") REFERENCES "Plano"("id") ON DELETE SET NULL ON UPDATE CASCADE;
