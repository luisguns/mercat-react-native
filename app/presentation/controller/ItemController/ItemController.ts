import { ErrorResource, SuccessResource } from "../../../data/helper/Resource";
import { ItemDI } from "../../../di/Item/ItemDI";
import ItemPurchasedModel from "../../../domain/models/ItemPurchased";
import { Obeservable } from "../../../helper/Observer";
import { ErrorUiState, LoadingUiState, SuccessUiState, UiState } from "../../../helper/UiState";

export default class ItemController {
    useCase = ItemDI.getItemUsecase();
    observableNewItem = new Obeservable<ItemPurchasedModel>();
    observableGetItemSection = new Obeservable<ItemPurchasedModel[]>();

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

    async getItemBySection(sectionID: string, orderByName: boolean) {
        this.observableGetItemSection.emit(new LoadingUiState<ItemPurchasedModel[]>())
        this.useCase.getAllItemBySection(sectionID, orderByName)
        .then((result) => {
            if( result instanceof SuccessResource){
                this.observableGetItemSection.emit(new SuccessUiState<ItemPurchasedModel[]>(result.data)) 
            } else if (result instanceof ErrorResource) {
                this.observableGetItemSection.emit(new ErrorUiState<ItemPurchasedModel[]>(result.toUiError())) 
            } else {
                this.observableGetItemSection.emit(new ErrorUiState<ItemPurchasedModel[]>({
                    code: -1,
                    mensage: ""
                }))
            }
        }).catch((err) => {
            
        });
    }
}
