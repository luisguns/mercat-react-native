
export class PlaceModel {
    id: String = ""
    nome: string
    endereco: string
    bairro: string
    cidade: string
    estado: string
    
    constructor (name: string, endereco: string, bairro: string, cidade: string, estado: string) {
        this.nome = name
        this.endereco = endereco
        this.bairro = bairro
        this.cidade = cidade
        this.estado = estado
    }

    toObject() {
        return {
            nome: this.nome,
            endereco: this.endereco,
            bairro: this.bairro,
            cidade: this.cidade,
            estado: this.estado,
        }
    }
}
