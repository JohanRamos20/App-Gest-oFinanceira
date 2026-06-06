import { TransacaoRepository } from "../../../domain/repositories/transacao-repository";
import { CarteiraRepository } from "../../../domain/repositories/carteira-repository";
import { Transacao, Categorias, TipoTransacao } from "../../../domain/entities/transacao";
import { toTransacaoDto, TransacaoDto } from "../../dtos/transacao-dtos";

export interface CreateTransacaoRequest {
    nome: string;
    id_usuario: string;
    valor: number;
    categoria: Categorias
    tipo_transacao: TipoTransacao;
}

export class CreateTransacaoUseCase {
    constructor(private transacaoRepository: TransacaoRepository,
        private carteiraRepository: CarteiraRepository
    ) {}

    async create(req: CreateTransacaoRequest) : Promise<TransacaoDto> {
        const carteiraExistente = await this.carteiraRepository.getByUserId(req.id_usuario);
        if(!carteiraExistente) {
            throw new Error("Carteira não encontrada");
        }



    const transacao = Transacao.create({
        nome: req.nome,
        id_carteira: carteiraExistente.id,
        valor: req.valor,
        categoria: req.categoria,
        tipo_transacao: req.tipo_transacao
    });

    const transacaoCriada = await this.transacaoRepository.createTransacao(transacao);

    const todasTransacoes = await this.transacaoRepository.getAllTransacaoByCarteira(carteiraExistente.id);
    const novoSaldo = todasTransacoes.reduce((saldo, t) => {
            return t.tipo_transacao === TipoTransacao.CREDITO
            ? saldo + t.valor
            : saldo - t.valor;
    }, 0);

    await this.carteiraRepository.setCacheWalletBalance(carteiraExistente.id, novoSaldo);

    return toTransacaoDto(transacaoCriada);
}
}