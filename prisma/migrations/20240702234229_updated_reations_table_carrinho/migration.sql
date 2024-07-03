-- AddForeignKey
ALTER TABLE "Carrinho" ADD CONSTRAINT "Carrinho_idCliente_fkey" FOREIGN KEY ("idCliente") REFERENCES "Cliente"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Carrinho" ADD CONSTRAINT "Carrinho_idProduto_fkey" FOREIGN KEY ("idProduto") REFERENCES "Produto"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Carrinho" ADD CONSTRAINT "Carrinho_idPlano_fkey" FOREIGN KEY ("idPlano") REFERENCES "Plano"("id") ON DELETE SET NULL ON UPDATE CASCADE;
