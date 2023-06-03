import { Resource } from "../../data/helper/Resource";
import ItemModel from "../models/Item";
import ItemPurchasedModel from "../models/ItemPurchased";

export default interface ItemRepository {
    
    getPurchasedItemBySection(sectionId: string, orderByName: boolean): Promise<Resource<ItemPurchasedModel[]>>
    saveItemPurchased(itemPurchased: ItemPurchasedModel, idItem?: string): Promise<Resource<ItemPurchasedModel>>
    getAllItems(): Promise<Resource<ItemModel[]>>
    getItemByName(name: string): Promise<Resource<ItemModel | undefined>>
}