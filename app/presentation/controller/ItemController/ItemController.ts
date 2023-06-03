import { ItemDI } from "../../../di/Item/ItemDI";
import ItemPurchasedModel from "../../../domain/models/ItemPurchased";
import { Obeservable } from "../../../helper/Observer";
import { UiState } from "../../../helper/UiState";

export default class ItemController {
    useCase = ItemDI.getItemUsecase();
    observableNewItem = new Obeservable<ItemPurchasedModel>();

    async registerNewItemPurchased(itemPurchased: ItemPurchasedModel) {
        this.observableNewItem.emit(
            UiState.UiStateLoading<ItemPurchasedModel>())
        this.useCase
            .createNewPurhcasedItem(itemPurchased)
            .then((result) => {
                if (result.data) {
                    this.observableNewItem.emit(
                        UiState.UiStateSuccess(result.data)
                    );
                } else if (result.error?.code) {
                    this.observableNewItem.emit(
                        UiState.UiStateError<ItemPurchasedModel>(result.toUiError()))
                }
            })
            .catch((err) => {
                console.log("CONTROLER ERR ", err)
                this.observableNewItem.emit(
                    UiState.UiStateError<ItemPurchasedModel>({
                        code: -1,
                        mensage: "UNKNOWS",
                    })
                );
            });
    }
}
