-- AlterTable
ALTER TABLE "Contato" ADD COLUMN     "idSituacao" INTEGER;

-- AlterTable
ALTER TABLE "SobreNos" ADD COLUMN     "idSituacao" INTEGER;

-- AddForeignKey
ALTER TABLE "SobreNos" ADD CONSTRAINT "SobreNos_idSituacao_fkey" FOREIGN KEY ("idSituacao") REFERENCES "Situacao"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Contato" ADD CONSTRAINT "Contato_idSituacao_fkey" FOREIGN KEY ("idSituacao") REFERENCES "Situacao"("id") ON DELETE SET NULL ON UPDATE CASCADE;
