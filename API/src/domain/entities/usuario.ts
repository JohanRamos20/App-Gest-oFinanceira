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

        if(props.email.includes('@') === false) {
            throw new Error("O email é inválido");
        }

        if(props.senha_hash.length < 4) {
            throw new Error("A senha deve conter no mínimo 4 caracteres");
        }

        return new Usuario(props);
    }
}