export default class CardModel{
    id: String = ''

    toObject() {
        return {
            id: this.id
        }
    }
}