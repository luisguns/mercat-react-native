import { ErrorResource, SuccessResource } from "../../../data/helper/Resource";
import { SectionDI } from "../../../di/Section/SectionDI";
import SectionModel from "../../../domain/models/SectionModel";
import { PlaceModel } from "../../../domain/models/placemodel";
import { Obeservable } from "../../../helper/Observer";
import { ErrorUiState, LoadingUiState, SuccessUiState } from "../../../helper/UiState";

export default class SectionController {
    private sectionUseCase = SectionDI.getSectionUseCase();

    observableSectionGet = new Obeservable<SectionModel[]>()
    observableSectionNewWithPlace = new Obeservable<SectionModel>()

    async getSectionByUid(uid: string, withLoad: boolean) {
        if(uid){
            if(withLoad) {
                this.observableSectionGet.emit(new LoadingUiState<SectionModel[]>())
            }
            await this.sectionUseCase.getSectionByUid(uid)
            .then((response) => {
                if(response instanceof SuccessResource) {
                    this.observableSectionGet.emit(new SuccessUiState<SectionModel[]>(response.data))
                } else if (response instanceof ErrorResource){
                    this.observableSectionGet.emit(new ErrorUiState<SectionModel[]>(response.toUiError()))
                } else {
                    this.observableSectionGet.emit(new ErrorUiState<SectionModel[]>({
                        code: -1,
                        mensage: "UNKNOW"
                    }))
                    
                }
    
            }).
            catch((e) => {
                console.error(e)
                this.observableSectionGet.emit(new ErrorUiState<SectionModel[]>({
                    code: -1,
                    mensage: "UNKNOW"
                }))
            });
        }
        }

        async registerNewAddressAnSection(placeModel: PlaceModel, uid: string)  {
            this.observableSectionNewWithPlace.emit(new LoadingUiState<SectionModel>())
            await this.sectionUseCase.createSectionWithPlace(placeModel, uid).then ((value) => {
                if (value instanceof SuccessResource) {
                    this.observableSectionNewWithPlace.emit(new SuccessUiState(value.data))
                } else if (value instanceof ErrorResource) {
                    console.error(value.error)
                    this.observableSectionNewWithPlace.emit(new ErrorUiState<SectionModel>({
                        code: value.error?.code,
                        mensage: value.error?.mensage,
                    }))
                }
            })
        }
}
