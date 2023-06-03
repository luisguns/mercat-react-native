export default class ItemModel {
    id?: string
    nome: string

    constructor (nome: string, id?: string) {
        this.nome = nome
        this.id = id
    }
}