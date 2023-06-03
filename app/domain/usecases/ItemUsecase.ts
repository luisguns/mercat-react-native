import { Resource } from "../../data/helper/Resource";
import ItemPurchasedModel from "../models/ItemPurchased";
import ItemRepository from "../repository/ItemRepository";

export default class ItemUsecase {
    repository: ItemRepository
    constructor (repository: ItemRepository){
        this.repository = repository
    }

    async createNewPurhcasedItem(itemPurchased: ItemPurchasedModel): Promise<Resource<ItemPurchasedModel>> {
        return await this.repository.saveItemPurchased(itemPurchased) 
    }

    async getAllItemBySection(sectionId: string, orderByName: boolean): Promise<Resource<ItemPurchasedModel[]>> {
        return await this.repository.getPurchasedItemBySection(sectionId, orderByName) 
    }
}