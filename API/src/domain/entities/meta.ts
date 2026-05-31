import { v4 as uuidv4 } from "uuid";

export interface MetaPropriedades {
    id?: string;
    id_usuario: string;
    nome: string;
    descricao: string;
    valor_total: number;
    valor_guardado: number;
    criado_em?: Date;
}

export class Meta implements MetaPropriedades {
    id: string;
    id_usuario: string
    nome: string;
    descricao: string
    valor_total: number;
    valor_guardado: number;
    criado_em: Date;
    constructor(props: MetaPropriedades) {
        this.id = props.id ?? uuidv4();
        this.id_usuario = props.id_usuario;
        this.nome = props.nome;
        this.descricao = props.descricao;
        this.valor_total = props.valor_total;
        this.valor_guardado = 0;
        this.criado_em = props.criado_em ?? new Date();
    }

    static create(props: MetaPropriedades): Meta {
        if (props.nome.length < 0) {
            throw new Error("O nome é obrigatório");
        }
        if (props.valor_total <= 0) {
            throw new Error("O valor total é obrigatório");
        }
        return new Meta(props);
    }
}