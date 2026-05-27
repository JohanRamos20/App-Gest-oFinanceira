-- CreateEnum
CREATE TYPE "Categoria" AS ENUM ('LAZER', 'MERCADO', 'DESPESAS', 'COMPRAS', 'COMIDA');

-- CreateEnum
CREATE TYPE "TipoTransacao" AS ENUM ('DEBITO', 'CREDITO');

-- CreateTable
CREATE TABLE "Usuario" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha_hash" TEXT NOT NULL,
    "criado_em" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Carteira" (
    "id" TEXT NOT NULL,
    "id_usuario" TEXT NOT NULL,
    "saldo_cache" DECIMAL(65,30) NOT NULL DEFAULT 0,

    CONSTRAINT "Carteira_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Transacao" (
    "id" TEXT NOT NULL,
    "carteira_id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "categoria" "Categoria" NOT NULL,
    "valor" DECIMAL(65,30) NOT NULL,
    "tipo_transacao" "TipoTransacao" NOT NULL,
    "criado_em" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Transacao_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Metas" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "valor_total" DECIMAL(65,30) NOT NULL,
    "valor_guardado" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "criado_em" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Metas_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Carteira_id_usuario_key" ON "Carteira"("id_usuario");

-- AddForeignKey
ALTER TABLE "Carteira" ADD CONSTRAINT "Carteira_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transacao" ADD CONSTRAINT "Transacao_carteira_id_fkey" FOREIGN KEY ("carteira_id") REFERENCES "Carteira"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Metas" ADD CONSTRAINT "Metas_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
