export class PlaceModel {
    id: String = "";
    nome: string;
    endereco: string;
    bairro: string;
    cidade: string;
    estado: string;
    favorite: boolean;
    uid: string;

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
        this.uid = uid
    }

    toObject() {
        return {
            id: this.id,
            nome: this.nome,
            endereco: this.endereco,
            bairro: this.bairro,
            cidade: this.cidade,
            estado: this.estado,
            favorite: this.favorite,
        };
    }

    getCompleteAddres(): string {
        return `${this.endereco} bairro ${this.bairro}, ${this.cidade} - ${this.estado}`;
    }
}
