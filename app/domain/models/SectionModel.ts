import { Timestamp } from "firebase/firestore";
import CardModel from "./CardModel";
import { PlaceModel } from "./placemodel";

export default class SectionModel {
    id = ""
    place: string
    card: string
    placeName: string
    placeAddress: string
    userId: string
    actived: boolean
    date: Timestamp
    finalValue: number
    

    constructor (place: string, card: string, placeName: string, placeAddress: string, uid: string, actived: boolean = true, finalValue = 0) {
        this.place = place
        this.card = card
        this.placeName = placeName
        this.placeAddress = placeAddress
        this.userId = uid
        this.actived = actived
        this.date = Timestamp.now()
        this.finalValue = finalValue
    }
}