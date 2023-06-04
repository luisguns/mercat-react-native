import { firestore } from "../../../config/firebaseconfig";
import ItemModel from "../../../domain/models/Item";
import ItemPurchasedModel from "../../../domain/models/ItemPurchased";
import ItemRepository from "../../../domain/repository/ItemRepository";
import { Resource } from "../../helper/Resource";
import Collections from "../../service/Collections.json";

export default class ItemRepositoryImp implements ItemRepository {
    async getPurchasedItemBySection(
        sectionId: string,
        orderByName: boolean
    ): Promise<Resource<ItemPurchasedModel[]>> {
        return await firestore().collection(Collections.purchased_item_collection)
        .where("idSection", "==", sectionId)
        .get()
        .then((response) => {
            const itemPurchasedList: ItemPurchasedModel[] = []
            response.forEach((itemPurchasedDTO) => {
                const itemPurchased = itemPurchasedDTO.data() as ItemPurchasedModel
                itemPurchasedList.push(itemPurchased)
            })
            if(orderByName){
                itemPurchasedList.sort((a, b) => (a.name < b.name) ? -1 : 1);
            }
            return Resource.Success(itemPurchasedList)
        })
        .catch((err) => {
            const error = err as Error
            return Resource.Error({
                code: -1,
                mensage: error.message
            })
        })

    }
    async saveItemPurchased(
        itemPurchased: ItemPurchasedModel
    ): Promise<Resource<ItemPurchasedModel>> {
        try {
            const purchasedItemDoc = firestore()
                    .collection(Collections.purchased_item_collection)
                    .doc();
                itemPurchased.id = purchasedItemDoc.id;
            if (itemPurchased.idItem) {
                return await purchasedItemDoc
                    .set(itemPurchased)
                    .then((result) => {
                        return Resource.Success(itemPurchased);
                    })
                    .catch((err) => {
                        const error = err as Error;
                        return Resource.Error({
                            code: -1,
                            mensage: error.message,
                        });
                    });
            } else {
                return await this.getItemByName(itemPurchased.name)
                    .then(async (result) => {
                        if (result.data?.id) {
                            itemPurchased.idItem = result.data?.id;
                            return purchasedItemDoc
                                .set(itemPurchased)
                                .then((result) => {
                                    return Resource.Success(itemPurchased);
                                })
                                .catch((err) => {
                                    const error = err as Error;
                                    return Resource.Error<ItemPurchasedModel>({
                                        code: -1,
                                        mensage: error.message,
                                    });
                                });
                        } else {
                            const batch = firestore().batch();

                            const itemCollection = firestore()
                                .collection(Collections.item_collection)
                                .doc();

                            const itemModel = new ItemModel(
                                itemPurchased.name.trim().toLowerCase(),
                                itemCollection.id
                            );
                            itemPurchased.idItem = itemCollection.id;

                            batch.set(itemCollection, itemModel);
                            batch.set(purchasedItemDoc, itemPurchased);

                            try {
                                const result_4 = await batch.commit();
                                return Resource.Success(itemPurchased);
                            } catch (err_1) {
                                const error_2 = err_1 as Error;
                                return Resource.Error<ItemPurchasedModel>({
                                    code: -1,
                                    mensage: error_2.message,
                                });
                            }
                        }
                    })
                    .catch((err) => {
                        const error = err as Error;
                        return Resource.Error({
                            code: -1,
                            mensage: error.message,
                        });
                    });
            }
        } catch (err) {
            const error = err as Error;
            return Resource.Error({
                code: -1,
                mensage: error.message,
            });
        }
    }
    async getAllItems(): Promise<Resource<ItemModel[]>> {
        try {
            return await firestore()
                .collection(Collections.item_collection)
                .get()
                .then((result) => {
                    const listItem: ItemModel[] = [];
                    result.forEach((itemDTO) => {
                        let item = itemDTO.data() as ItemModel;
                        listItem.push(item);
                    });

                    return Resource.Success(listItem);
                })
                .catch((err) => {
                    const error = err as Error;
                    return Resource.Error({
                        code: -1,
                        mensage: error.message,
                    });
                });
        } catch (err) {
            const error = err as Error;
            return Resource.Error({
                code: -1,
                mensage: error.message,
            });
        }
    }
    async getItemByName(
        name: string
    ): Promise<Resource<ItemModel | undefined>> {
        try {
            return await firestore()
                .collection(Collections.item_collection)
                .where("nome", "==", name.trim().toLowerCase())
                .limit(1)
                .get()
                .then((result) => {
                    let data = result.docs[0]
                        ? result.docs[0].data()
                        : undefined;
                    let item = data ? (data as ItemModel) : undefined;
                    return Resource.Success(item);
                })
                .catch((err) => {
                    const error = err as Error;
                    return Resource.Error({
                        code: -1,
                        mensage: error.message,
                    });
                });
        } catch (err) {
            const error = err as Error;
            return Resource.Error({
                code: -1,
                mensage: error.message,
            });
        }
    }
}
