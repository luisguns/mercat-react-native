export class PlaceModel {
    id: String = "";
    nome: string;
    endereco: string;
    bairro: string;
    cidade: string;
    estado: string;
    favorite: boolean;

    constructor(
        name: string,
        endereco: string,
        bairro: string,
        cidade: string,
        estado: string,
        favorite: boolean = false,
        uid: string = "",
    ) {
        this.nome = name;
        this.endereco = endereco;
        this.bairro = bairro;
        this.cidade = cidade;
        this.estado = estado;
        this.favorite = favorite;
    }

    toObject() {
        return {
            id: this.id,
            nome: this.nome,
            endereco: this.endereco,
            bairro: this.bairro,
            cidade: this.cidade,
            estado: this.estado,
        };
    }

    getCompleteAddres(): string {
        return `${this.endereco} bairro ${this.bairro}, ${this.cidade} - ${this.estado}`;
    }

    static getCompleteAddress(placeModel: PlaceModel): string {
        return `${placeModel.endereco} bairro ${placeModel.bairro}, ${placeModel.cidade} - ${placeModel.estado}`;
    }
}

export type favoritePlace = {
    idPlace: string,
    idUsuario: string
}
