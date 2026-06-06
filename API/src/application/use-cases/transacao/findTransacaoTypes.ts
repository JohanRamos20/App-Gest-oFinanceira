import { TransacaoRepository, FiltroTransacao } from "../../../domain/repositories/transacao-repository";
import { TransacaoDto, toTransacaoDto } from "../../dtos/transacao-dtos";
import { CarteiraRepository } from "../../../domain/repositories/carteira-repository";

export interface FindTransacaoTypesRequest {
    id_usuario: string;
    filtro: FiltroTransacao;
}

export class FindTransacaoTypesUseCase {
    constructor(private transacaoRepository: TransacaoRepository, private carteiraRepository: CarteiraRepository) {}

    async find(req: FindTransacaoTypesRequest): Promise<TransacaoDto[]> {
        const carteiraExistente = await this.carteiraRepository.getByUserId(req.id_usuario);
        if(!carteiraExistente) {
            throw new Error("Carteira não encontrada");
        }
        const transacoes = await this.transacaoRepository.getTransacoesByFiltro(carteiraExistente.id, req.filtro);
        return transacoes.map(toTransacaoDto);
    }
}