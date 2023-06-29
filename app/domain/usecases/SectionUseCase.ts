import { Resource } from "../../data/helper/Resource";
import SectionModel from "../models/SectionModel";
import { PlaceModel } from "../models/placemodel";
import SectionRepository from "../repository/SectionRepository";

export default class SectioUseCase {
    repository: SectionRepository
    constructor (repository: SectionRepository) {
        this.repository = repository
    }

    async getSectionByUid(uid: string): Promise<Resource<SectionModel[]>> {
        return await this.repository.getSectionByUid(uid)
    }

    async createSectionWithPlace(place: PlaceModel, uid: string): Promise<Resource<SectionModel>> {
        return await this.repository.createNewSectionWithPlace(place, uid)
    }

    async finishSection(section: SectionModel) {
        return await this.repository.finishSection(section)
    }

}