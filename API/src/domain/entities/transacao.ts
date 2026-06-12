import { v4 as uuidv4 } from 'uuid';

export enum Categorias {
    LAZER = 'LAZER',
    MERCADO = 'MERCADO',
    DESPESAS = 'DESPESAS',
    COMPRAS = 'COMPRAS',
    COMIDA = 'COMIDA'
}

export enum TipoTransacao {
    DEBITO = 'DEBITO',
    CREDITO = 'CREDITO'
}

export function isCategoria(value: unknown): value is Categorias {
    return Object.values(Categorias).includes(value as Categorias);
}

export function isTipoTransacao(value: unknown): value is TipoTransacao {
    return Object.values(TipoTransacao).includes(value as TipoTransacao);
}

export interface TransacaoPropriedades {
    nome: string;
    id?: string;
    id_carteira: string;
    valor: number;
    categoria: Categorias;
    tipo_transacao: TipoTransacao;
    criado_em?: Date;
}

export class Transacao implements TransacaoPropriedades {
    id: string;
    nome: string;
    id_carteira: string;
    valor: number;
    categoria: Categorias;
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

        if (!isCategoria(props.categoria)) {
            throw new Error('Categoria inválida');
        }
        if (!isTipoTransacao(props.tipo_transacao)) {
            throw new Error('Tipo de Transação inválida');
        }

        
        return new Transacao(props);
    }

    static createFromPrimitives(props: {
        id: string;
        nome: string;
        id_carteira: string;
        valor: number;
        categoria: string;
        tipo_transacao: string;
        criado_em: Date;
    }): Transacao {
        return new Transacao({
            ...props,
            categoria : props.categoria as Categorias,
            tipo_transacao : props.tipo_transacao as TipoTransacao
        });

}
}
