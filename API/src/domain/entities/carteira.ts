import { v4 as uuidv4 } from 'uuid';

export interface CarteiraPropriedades{
    id?: string;
    id_usuario: string;
    saldo_cache: number;
}

export class Carteira implements CarteiraPropriedades{
    id: string;
    id_usuario: string;
    saldo_cache: number;

    constructor(props: CarteiraPropriedades){
        this.id = props.id ?? uuidv4();
        this.id_usuario = props.id_usuario;
        this.saldo_cache = props.saldo_cache;
    }

    static create(props: CarteiraPropriedades): Carteira{

        if(props.saldo_cache != 0){
            throw new Error("O saldo inicial da carteira deve ser 0");
        }

        return new Carteira(props);
    }

    static createFromPrimitives(props: {
        id: string;
        id_usuario: string;
        saldo_cache: number;
    }): Carteira {
        return new Carteira(props);
    }
}