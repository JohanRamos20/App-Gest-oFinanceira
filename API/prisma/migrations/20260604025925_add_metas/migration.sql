/*
  Warnings:

  - You are about to drop the column `user_id` on the `Metas` table. All the data in the column will be lost.
  - Added the required column `id_usuario` to the `Metas` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `categoria` on the `Transacao` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `tipo_transacao` on the `Transacao` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "Metas" DROP CONSTRAINT "Metas_user_id_fkey";

-- AlterTable
ALTER TABLE "Metas" DROP COLUMN "user_id",
ADD COLUMN     "id_usuario" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Transacao" DROP COLUMN "categoria",
ADD COLUMN     "categoria" TEXT NOT NULL,
DROP COLUMN "tipo_transacao",
ADD COLUMN     "tipo_transacao" TEXT NOT NULL;

-- DropEnum
DROP TYPE "Categoria";

-- DropEnum
DROP TYPE "TipoTransacao";

-- CreateIndex
CREATE INDEX "Metas_id_usuario_idx" ON "Metas"("id_usuario");

-- CreateIndex
CREATE INDEX "Transacao_carteira_id_idx" ON "Transacao"("carteira_id");

-- CreateIndex
CREATE INDEX "Transacao_criado_em_idx" ON "Transacao"("criado_em");

-- AddForeignKey
ALTER TABLE "Metas" ADD CONSTRAINT "Metas_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
