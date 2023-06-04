export default class ItemPurchasedModel {
    id?: string;
    idSection: string;
    idPlace: string;
    userId: string;
    idItem?: string;
    name: string;
    value: number;
    promotion: boolean;
    quantity: number;

    constructor(
        idSection: string,
        idPlace: string,
        name: string,
        value: number,
        promotion: boolean,
        quantity: number,
        userId: string,
        id?: string,
        idItem?: string,
    ) {
        this.id = id,
        this.idSection = idSection
        this.idPlace = idPlace
        this.idItem = idItem
        this.name = name
        this.userId = userId
        this.value = value
        this.promotion = promotion
        this.quantity = quantity
    }
}
