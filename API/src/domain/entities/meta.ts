import { v4 as uuidv4 } from "uuid";

export interface MetaPropriedades {
    id?: string;
    id_usuario: string;
    nome: string;
    descricao?: string;
    valor_total: number;
    valor_guardado?: number;
    criado_em?: Date;
}

export class Meta implements MetaPropriedades {
    id: string;
    id_usuario: string
    nome: string;
    descricao: string
    valor_total: number;
    valor_guardado: number = 0;
    criado_em: Date;
    constructor(props: MetaPropriedades) {
        this.id = props.id ?? uuidv4();
        this.id_usuario = props.id_usuario;
        this.nome = props.nome;
        this.descricao = props.descricao ?? "Sem descrição";
        this.valor_total = props.valor_total;
        this.valor_guardado = props.valor_guardado ?? 0;
        this.criado_em = props.criado_em ?? new Date();
    }

    static create(props: MetaPropriedades): Meta {
        if (props.nome.length === 0) {
            throw new Error("O nome é obrigatório");
        }
        if (props.valor_total <= 0) {
            throw new Error("O valor total é obrigatório");
        }
        return new Meta(props);
    }

    updateValorGuardado(valor: number): { metaAtingida: boolean; valorRestante: number }  {
        if(valor <= 0) {
            throw new Error("O valor guardado não pode ser negativo");
        }
        if(this.valor_guardado + valor > this.valor_total) {
            throw new Error("O valor guardado não pode ser maior que o valor total da meta");
        }   
        this.valor_guardado += valor;

        return {
            metaAtingida: this.metaAtingida(),
            valorRestante: this.valorRestante()
        }
    }

    metaAtingida(): boolean {
        return this.valor_guardado >= this.valor_total;
    }

    valorRestante(): number {
        return this.valor_total - this.valor_guardado;
    }

    static createFromPrimitives(props: {
        id: string;
        id_usuario: string;
        nome: string;
        descricao: string;
        valor_total: number;
        valor_guardado: number;
        criado_em: Date;
    }): Meta {
        return new Meta(props);
        }

}