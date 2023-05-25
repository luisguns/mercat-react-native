import { Resource } from "../../data/helper/Resource";
import SectionModel from "../models/SectionModel";

export default interface SectionRepository {

    getSectionByUid(uid: string): Promise<Resource<SectionModel[]>>
    
    finishSection(sectionId: string): Promise<Resource<SectionModel>>

}