/*
  Warnings:

  - You are about to drop the column `saldo_cache` on the `Carteira` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Carteira" DROP COLUMN "saldo_cache",
ADD COLUMN     "saldo" DECIMAL(65,30) NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE "logs_auditoria" (
    "id" TEXT NOT NULL,
    "evento" TEXT NOT NULL,
    "id_usuario" TEXT NOT NULL,
    "id_entidade" TEXT NOT NULL,
    "dados" JSONB NOT NULL,
    "criado_em" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "logs_auditoria_pkey" PRIMARY KEY ("id")
);
