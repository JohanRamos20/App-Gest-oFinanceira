import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
    throw new Error("DATABASE_URL nao esta definida");
}

const databaseName = new URL(databaseUrl)
    .pathname
    .replace("/", "")

const environment = process.env.NODE_ENV ?? "development";

if (environment !== "test" && databaseName.endsWith("_test")) {
    throw new Error(
        `Aplicação ${environment} não pode usar o banco ${databaseName}`
    );
}

const adapter = new PrismaPg(databaseUrl);

export const prisma = new PrismaClient({ adapter });
