export const CATEGORIAS = ['Alimentação', 'Transporte', 'Lazer', 'Saúde', 'Educação', 'Outros'] as const;
export type Categoria = typeof CATEGORIAS[number];

export const TIPOS_TRANSACAO = ['Entrada', 'Saída'] as const;
export type TipoTransacao = typeof TIPOS_TRANSACAO[number];

import { v4 as uuidv4 } from 'uuid';
export interface TransacaoPropriedades {
    nome: string;
    id?: string;
    id_carteira: string;
    valor: number;
    categoria: Categoria;
    tipo_transacao: TipoTransacao;
    criado_em?: Date;
}

export class Transacao implements TransacaoPropriedades {
    id: string;
    nome: string;
    id_carteira: string;
    valor: number;
    categoria: Categoria;
    tipo_transacao: TipoTransacao;
    criado_em: Date;
    constructor(props: TransacaoPropriedades) {
        this.id = props.id ?? uuidv4();
        this.nome = props.nome;
        this.id_carteira = props.id_carteira;
        this.valor = props.valor;
        this.categoria = props.categoria;
        this.tipo_transacao = props.tipo_transacao;
        this.criado_em = props.criado_em ?? new Date();
    }

    static create(props: TransacaoPropriedades): Transacao {

        if(props.valor <= 0) {
            throw new Error("O valor da transação deve ser maior que zero");
        }

        if(props.nome.length === 0) {
            throw new Error("O nome da transação não pode ser vazio");
        }
        
        if(CATEGORIAS.includes(props.categoria) === false) {
            throw new Error("Categoria inválida");
        }

        if(TIPOS_TRANSACAO.includes(props.tipo_transacao) === false) {
            throw new Error("Tipo de transação inválida");
        }
        
        return new Transacao(props);
    }

}