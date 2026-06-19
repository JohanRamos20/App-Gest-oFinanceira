import { Carteira } from "../../src/domain/entities/carteira";
import { CarteiraRepository } from "../../src/domain/repositories/carteira-repository";
import { TipoTransacao, Transacao } from "../../src/domain/entities/transacao";
export class FakeCarteiraRepository implements CarteiraRepository {
    private carteiras : Carteira[] = []
    private transacoes : {id_carteira : string; valor : number; tipo : TipoTransacao}[] = []
    private cache: Map<string, { valor: number; expiresAt: number }> = new Map()
    private cacheKey = (id: string) => `carteira:saldo:${id}`
    private TTL_MS = 3600 * 1000

    async getByUserId(id_usuario: string): Promise<Carteira | null> {
        return this.carteiras.find(u => u.id_usuario === id_usuario) ?? null
    }

    async getSaldoByCarteira(id_carteira: string): Promise<number> {
    return this.transacoes
        .filter(t => t.id_carteira === id_carteira)
        .reduce((acc, t) => {
            return t.tipo === TipoTransacao.CREDITO ? acc + t.valor : acc - t.valor
        }, 0)
    }

    async getCacheWalletBalance(id_carteira: string): Promise<number | null> {
        const entrada = this.cache.get(this.cacheKey(id_carteira))
        if (!entrada) return null
        if (Date.now() > entrada.expiresAt) {
            this.cache.delete(this.cacheKey(id_carteira))
            return null
        }
        return entrada.valor
    }

    async incrementCacheWalletBalance(id_carteira: string, delta: number): Promise<void> {
        const chave = this.cacheKey(id_carteira)
        const entrada = this.cache.get(chave)

        if (!entrada) {
            const saldoAtual = await this.getSaldoByCarteira(id_carteira)
            this.cache.set(chave, { valor: saldoAtual, expiresAt: Date.now() + this.TTL_MS })
            return
        }

        entrada.valor += delta
    }

    async setCacheWalletBalance(id_carteira: string, novoSaldo: number): Promise<void> {
        this.cache.set(this.cacheKey(id_carteira), {
            valor: novoSaldo,
            expiresAt: Date.now() + this.TTL_MS,
        })
    }

     async createWallet(props: Carteira): Promise<Carteira> {
        this.carteiras.push(props)
        return props
    }

    adicionarTransacao(id_carteira: string, valor: number, tipo: TipoTransacao): void {
    this.transacoes.push({ id_carteira, valor, tipo })
    }

    getAll(): Carteira[] {
    return [...this.carteiras]
}

}