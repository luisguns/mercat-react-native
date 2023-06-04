import { ErrorResource, SuccessResource } from "../../../data/helper/Resource";
import { PlaceDI } from "../../../di/PlaceDI";
import SectionModel from "../../../domain/models/SectionModel";
import { PlaceModel } from "../../../domain/models/placemodel";
import { PlaceUsecase } from "../../../domain/usecases/PlaceUsecase";
import { Obeservable } from "../../../helper/Observer";
import { ErrorUiState, LoadingUiState, SuccessUiState, UiState } from "../../../helper/UiState";

export default class PlaceController {
    placeUseCase: PlaceUsecase
    constructor() {
        this.placeUseCase = PlaceDI.getPlaceUsecase()
    }

    placeRegisterObservable = new Obeservable<SectionModel>()
    observableFavoritePlaces = new Obeservable<PlaceModel[]>()



    async registerNewAddressAnSection(placeModel: PlaceModel, uid: string)  {
        this.placeRegisterObservable.emit(new LoadingUiState<SectionModel>())
        await this.placeUseCase.saveAddress(placeModel, uid).then ((value) => {
            if (value instanceof SuccessResource) {
                this.placeRegisterObservable.emit(new SuccessUiState(value.data))
            } else if (value instanceof ErrorResource) {
                console.log(value.error)
                this.placeRegisterObservable.emit(new ErrorUiState<SectionModel>({
                    code: value.error?.code,
                    mensage: value.error?.mensage,
                }))
            }
        })
    }

    async getFavoritePlaces(uid: string)  {
        this.observableFavoritePlaces.emit(new LoadingUiState<PlaceModel[]>())
        await this.placeUseCase.getFavoritePlaces(uid).then ((value) => {
            if (value instanceof SuccessResource) {
                this.observableFavoritePlaces.emit(new SuccessUiState(value.data))
            } else if (value instanceof ErrorResource) {
                this.observableFavoritePlaces.emit(new ErrorUiState<PlaceModel[]>({
                    code: value.error?.code,
                    mensage: value.error?.mensage,
                }))
            } else {
                this.observableFavoritePlaces.emit(new ErrorUiState<PlaceModel[]>({
                    code: -1,
                    mensage: "UNKNOW ERROR",
                }))
            }
        })
    }
}