import { Resource } from "../../data/helper/Resource";
import SectionModel from "../models/SectionModel";
import { PlaceModel } from "../models/placemodel";

export default interface SectionRepository {

    getSectionByUid(uid: string): Promise<Resource<SectionModel[]>>
    
    finishSection(section: SectionModel): Promise<Resource<SectionModel>>

    createNewSectionWithPlace(place: PlaceModel, uid: string): Promise<Resource<SectionModel>>

}