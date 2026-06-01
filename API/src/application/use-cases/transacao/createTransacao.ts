import { TransacaoRepository } from "../../../domain/repository/transacao-repository";
import { CarteiraRepository } from "../../../domain/repository/carteira-repository";
import { UsuarioRepository } from "../../../domain/repository/usuario-repository";
import { Transacao, Categorias, TipoTransacao } from "../../../domain/entities/transacao";

export interface CreateTransacaoRequest {
    nome: string;
    id_carteira: string;
    valor: number;
    categoria: Categorias
    tipo_transacao: TipoTransacao;
}

class CreateTransacao {
    constructor(private transacaoRepository: TransacaoRepository
        , private usuarioRepository: UsuarioRepository,
        private carteiraRepository: CarteiraRepository
    ) {}

    async create(req: CreateTransacaoRequest) : Promise<Transacao> {
        const carteiraExistente = await this.carteiraRepository.getByUserId(req.id_carteira);
        if(!carteiraExistente) {
            throw new Error("Carteira não encontrada");
        }

    const transacao = Transacao.create({
        nome: req.nome,
        id_carteira: req.id_carteira,
        valor: req.valor,
        categoria: req.categoria,
        tipo_transacao: req.tipo_transacao
    });

    const transacaoCreate = await this.transacaoRepository.createTransacao(transacao);

    const todasTransacoes = await this.transacaoRepository.getAllTransacaoByCarteira(req.id_carteira);
    const novoSaldo = todasTransacoes.reduce((saldo, t) => {
            return t.tipo_transacao === TipoTransacao.CREDITO
            ? saldo + t.valor
            : saldo - t.valor;
    }, 0);

    await this.carteiraRepository.setCacheWalletBalance(req.id_carteira, novoSaldo);

    return transacaoCreate;
}
}