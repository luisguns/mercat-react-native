import CardModel from "./CardModel";
import { PlaceModel } from "./placemodel";

export default class SectionModel {
    id = ""
    place: string
    card: string
    placeName: string
    placeAddress: string
    

    constructor (place: string, card: string, placeName: string, placeAddress: string) {
        this.place = place
        this.card = card
        this.placeName = placeName
        this.placeAddress = placeAddress
    }

    toObject() {
        return {
            id: this.id,
            place: this.place,
            card: this.card,
            placeName: this.placeName,
            placeAddress: this.placeAddress
        }
    }
}