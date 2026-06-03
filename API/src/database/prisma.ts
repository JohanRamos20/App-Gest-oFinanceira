import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
    throw new Error("DATABASE_URL nao esta definida");
}

const adapter = new PrismaPg(databaseUrl);

export const prisma = new PrismaClient({ adapter });
