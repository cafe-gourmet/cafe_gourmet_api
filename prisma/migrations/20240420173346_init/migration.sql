-- CreateTable
CREATE TABLE "Contato" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "endereco" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "linkGoogleMaps" TEXT NOT NULL,

    CONSTRAINT "Contato_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Carrinho" (
    "id" SERIAL NOT NULL,
    "idProduto" INTEGER NOT NULL,
    "idCliente" INTEGER NOT NULL,
    "qntProduto" INTEGER NOT NULL,
    "idPlano" INTEGER NOT NULL,

    CONSTRAINT "Carrinho_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Situacao" (
    "id" SERIAL NOT NULL,
    "descricao" TEXT NOT NULL,

    CONSTRAINT "Situacao_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Permissao" (
    "id" SERIAL NOT NULL,
    "descricao" TEXT NOT NULL,

    CONSTRAINT "Permissao_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cargo" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "idSituacao" INTEGER NOT NULL,

    CONSTRAINT "Cargo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CargoPermissoes" (
    "idCargo" INTEGER NOT NULL,
    "idPermissao" INTEGER NOT NULL,

    CONSTRAINT "CargoPermissoes_pkey" PRIMARY KEY ("idCargo","idPermissao")
);

-- CreateTable
CREATE TABLE "Usuario" (
    "id" SERIAL NOT NULL,
    "nomeCompleto" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "fotoPerfil" BYTEA NOT NULL,
    "idCargo" INTEGER NOT NULL,
    "idSituacao" INTEGER NOT NULL,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cliente" (
    "id" SERIAL NOT NULL,
    "cpf" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "endereco" TEXT NOT NULL,
    "planoId" INTEGER NOT NULL,
    "idUsuario" INTEGER NOT NULL,

    CONSTRAINT "Cliente_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Plano" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "preco" DOUBLE PRECISION NOT NULL,
    "descricao" TEXT NOT NULL,
    "idSituacao" INTEGER NOT NULL,
    "idPeriodo" INTEGER NOT NULL,

    CONSTRAINT "Plano_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlanoPeriodo" (
    "id" SERIAL NOT NULL,
    "descricao" TEXT NOT NULL,

    CONSTRAINT "PlanoPeriodo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Produto" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "marca" TEXT NOT NULL,
    "preco" DOUBLE PRECISION NOT NULL,
    "codigoBarras" BIGINT NOT NULL,
    "idCategoria" INTEGER NOT NULL,
    "quantidade" INTEGER NOT NULL,
    "percentualDescontoMensal" INTEGER NOT NULL,
    "percentualDescontoAnual" INTEGER NOT NULL,

    CONSTRAINT "Produto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlanoProdutos" (
    "idPlano" INTEGER NOT NULL,
    "idProduto" INTEGER NOT NULL,

    CONSTRAINT "PlanoProdutos_pkey" PRIMARY KEY ("idPlano","idProduto")
);

-- CreateTable
CREATE TABLE "Categoria" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,

    CONSTRAINT "Categoria_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Anexo" (
    "id" SERIAL NOT NULL,
    "idProduto" INTEGER,
    "idPlano" INTEGER,
    "arquivo" BYTEA NOT NULL,
    "tipo" TEXT NOT NULL,

    CONSTRAINT "Anexo_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Cliente_idUsuario_key" ON "Cliente"("idUsuario");

-- AddForeignKey
ALTER TABLE "Cargo" ADD CONSTRAINT "Cargo_idSituacao_fkey" FOREIGN KEY ("idSituacao") REFERENCES "Situacao"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CargoPermissoes" ADD CONSTRAINT "CargoPermissoes_idCargo_fkey" FOREIGN KEY ("idCargo") REFERENCES "Cargo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CargoPermissoes" ADD CONSTRAINT "CargoPermissoes_idPermissao_fkey" FOREIGN KEY ("idPermissao") REFERENCES "Permissao"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Usuario" ADD CONSTRAINT "Usuario_idCargo_fkey" FOREIGN KEY ("idCargo") REFERENCES "Cargo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Usuario" ADD CONSTRAINT "Usuario_idSituacao_fkey" FOREIGN KEY ("idSituacao") REFERENCES "Situacao"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cliente" ADD CONSTRAINT "Cliente_planoId_fkey" FOREIGN KEY ("planoId") REFERENCES "Plano"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cliente" ADD CONSTRAINT "Cliente_idUsuario_fkey" FOREIGN KEY ("idUsuario") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Plano" ADD CONSTRAINT "Plano_idSituacao_fkey" FOREIGN KEY ("idSituacao") REFERENCES "Situacao"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Plano" ADD CONSTRAINT "Plano_idPeriodo_fkey" FOREIGN KEY ("idPeriodo") REFERENCES "PlanoPeriodo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Produto" ADD CONSTRAINT "Produto_idCategoria_fkey" FOREIGN KEY ("idCategoria") REFERENCES "Categoria"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlanoProdutos" ADD CONSTRAINT "PlanoProdutos_idPlano_fkey" FOREIGN KEY ("idPlano") REFERENCES "Plano"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlanoProdutos" ADD CONSTRAINT "PlanoProdutos_idProduto_fkey" FOREIGN KEY ("idProduto") REFERENCES "Produto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Anexo" ADD CONSTRAINT "Anexo_idProduto_fkey" FOREIGN KEY ("idProduto") REFERENCES "Produto"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Anexo" ADD CONSTRAINT "Anexo_idPlano_fkey" FOREIGN KEY ("idPlano") REFERENCES "Plano"("id") ON DELETE SET NULL ON UPDATE CASCADE;
