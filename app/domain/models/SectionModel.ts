import CardModel from "./CardModel";
import { PlaceModel } from "./placemodel";

export default class SectionModel {
    id = ""
    place: string
    card: string
    

    constructor (place: string, card: string) {
        this.place = place
        this.card = card
    }

    toObject() {
        return {
            id: this.id,
            place: this.place,
            card: this.card
        }
    }
}