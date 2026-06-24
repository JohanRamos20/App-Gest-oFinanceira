/*
  O saldo da carteira e derivado das transacoes e armazenado em cache no Redis.
  Esta coluna deixou de fazer parte do schema Prisma.
*/
ALTER TABLE "Carteira" DROP COLUMN "saldo";
