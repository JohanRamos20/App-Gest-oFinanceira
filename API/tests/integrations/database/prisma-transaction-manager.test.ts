import {
    afterAll,
    afterEach,
    describe,
    expect,
    it,
} from "vitest";
import { randomUUID } from "node:crypto";
import { prisma } from "../../../src/database/prisma";
import { PrismaTransactionManager } from "../../../src/database/prisma-transaction-manager";
import { Usuario } from "../../../src/domain/entities/usuario";
import { Carteira } from "../../../src/domain/entities/carteira";

describe.sequential("PrismaTransactionManager", () => {
    const transactionManager =
        new PrismaTransactionManager(prisma);

    let usuarioId: string | undefined;

    afterEach(async () => {
        if (!usuarioId) return;

        await prisma.carteira.deleteMany({
            where: { id_usuario: usuarioId },
        });

        await prisma.usuario.deleteMany({
            where: { id: usuarioId },
        });

        usuarioId = undefined;
    });

    afterAll(async () => {
        await prisma.$disconnect();
    });

    it("deve confirmar todas as operações", async () => {
        const usuario = Usuario.create({
            nome: "Teste Commit",
            email: `commit-${randomUUID()}@teste.com`,
            senha_hash: "hash",
        });

        usuarioId = usuario.id;

        const carteira = Carteira.create({
            id_usuario: usuario.id,
        });

        await transactionManager.execute(
            async ({ usuarioRepository, carteiraRepository }) => {
                await usuarioRepository.create(usuario);
                await carteiraRepository.createWallet(carteira);
            }
        );

        expect(
            await prisma.usuario.findUnique({
                where: { id: usuario.id },
            })
        ).not.toBeNull();

        expect(
            await prisma.carteira.findUnique({
                where: { id_usuario: usuario.id },
            })
        ).not.toBeNull();
    });

    it("deve desfazer tudo quando ocorrer um erro", async () => {
        const usuario = Usuario.create({
            nome: "Teste Rollback",
            email: `rollback-${randomUUID()}@teste.com`,
            senha_hash: "hash",
        });

        usuarioId = usuario.id;

        const carteira = Carteira.create({
            id_usuario: usuario.id,
        });

        await expect(
            transactionManager.execute(
                async ({ usuarioRepository, carteiraRepository }) => {
                    await usuarioRepository.create(usuario);
                    await carteiraRepository.createWallet(carteira);

                    throw new Error("Falha proposital");
                }
            )
        ).rejects.toThrow("Falha proposital");

        expect(
            await prisma.usuario.findUnique({
                where: { id: usuario.id },
            })
        ).toBeNull();

        expect(
            await prisma.carteira.findUnique({
                where: { id_usuario: usuario.id },
            })
        ).toBeNull();
    });
});