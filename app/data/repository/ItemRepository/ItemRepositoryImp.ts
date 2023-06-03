import { firestore } from "../../../config/firebaseconfig";
import ItemModel from "../../../domain/models/Item";
import ItemPurchasedModel from "../../../domain/models/ItemPurchased";
import ItemRepository from "../../../domain/repository/ItemRepository";
import { Resource } from "../../helper/Resource";
import Collections from "../../service/Collections.json";

export default class ItemRepositoryImp implements ItemRepository {
    getPurchasedItemBySection(
        sectionId: string
    ): Promise<Resource<ItemPurchasedModel[]>> {
        throw new Error("Method not implemented.");
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
                            console.log(result.data)
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
                            console.log("DONT HAVE ITEM CREATED");
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
