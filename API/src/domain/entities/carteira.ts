import { v4 as uuidv4 } from 'uuid';

export interface CarteiraPropriedades{
    id?: string;
    id_usuario: string;
}

export class Carteira implements CarteiraPropriedades{
    id: string;
    id_usuario: string;

    constructor(props: CarteiraPropriedades){
        this.id = props.id ?? uuidv4();
        this.id_usuario = props.id_usuario;
    }

    static create(props: CarteiraPropriedades): Carteira{

        return new Carteira(props);
    }

    static createFromPrimitives(props: {
        id: string;
        id_usuario: string;
    }): Carteira {
        return new Carteira(props);
    }
}