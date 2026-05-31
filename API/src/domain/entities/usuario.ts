import { v4 as uuidv4 } from 'uuid';

export interface UsuarioPropriedades {
    id?: string;
    nome: string;
    email: string;
    senha_hash: string;
    criado_em?: Date;
}

export class Usuario implements UsuarioPropriedades {
    id: string;
    nome: string;
    email: string;
    senha_hash: string;
    criado_em: Date;
    constructor(props: UsuarioPropriedades) {
        this.id = props.id ?? uuidv4();
        this.nome = props.nome;
        this.email = props.email;
        this.senha_hash = props.senha_hash;
        this.criado_em = props.criado_em ?? new Date();
    }

    static create(props: UsuarioPropriedades) : Usuario {
        if(props.nome.length < 0){
            throw new Error("O nome é obrigatório");
        }
        const emailRegex = /^[^\s@]+@[^\s@]+.[^\s@]+$/

        if (!props.email || !emailRegex.test(props.email)) {
            throw new Error("O email é inválido");
        }
        return new Usuario(props);
    }

    atualizarSenha(novaSenha: string) {
        this.senha_hash = novaSenha;
    }

    static createFromPrimitives(props: {
    id: string;
    nome: string;
    email: string;
    senha_hash: string;
    criado_em: Date;
    }): Usuario {
        return new Usuario(props);
    }

}