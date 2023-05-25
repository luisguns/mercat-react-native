import { Resource } from "../../data/helper/Resource";
import SectionModel from "../models/SectionModel";
import SectionRepository from "../repository/SectionRepository";

export default class SectioUseCase {
    repository: SectionRepository
    constructor (repository: SectionRepository) {
        this.repository = repository
    }

    async getSectionByUid(uid: string): Promise<Resource<SectionModel[]>> {
        return await this.repository.getSectionByUid(uid)
    }

    finishSection() {

    }

}