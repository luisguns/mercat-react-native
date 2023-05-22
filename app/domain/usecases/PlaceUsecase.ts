import { Resource } from "../../data/helper/Resource";
import SectionModel from "../models/SectionModel";
import { PlaceModel } from "../models/placemodel";
import { PlaceRepository } from "../repository/PlaceRepository";

export class PlaceUsecase {
    repository: PlaceRepository
    constructor(repositoy: PlaceRepository) {
        this.repository = repositoy
    }

    async saveAddress(placeAddres: PlaceModel): Promise<Resource<SectionModel>> {
        return await this.repository.savePlace(placeAddres)
    }
}