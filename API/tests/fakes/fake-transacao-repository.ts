import { Transacao } from "../../src/domain/entities/transacao"
import { FiltroTransacao, TransacaoRepository } from "../../src/domain/repositories/transacao-repository"

export class FakeTransacaoRepository implements TransacaoRepository {
    private transacoes : Transacao[] = []

    async createTransacao(data: Transacao): Promise<Transacao> {
        this.transacoes.push(data)
        return data
    }

    async getTransacoesByFiltro(id_carteira: string, filtro: FiltroTransacao): Promise<Transacao[]> {
        const transacoes = this.transacoes.filter(
            m => {
                if(m.id_carteira !== id_carteira) return false
                if(filtro.tipo_transacao && m.tipo_transacao !== filtro.tipo_transacao) return false
                if(filtro.categoria && m.categoria !== filtro.categoria) return false
                return true
            } 
        )
        return transacoes
    }

    getAll(): Transacao[] {
            return [...this.transacoes]
        }
    

}