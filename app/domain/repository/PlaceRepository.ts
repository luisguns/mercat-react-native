import { Resource } from "../../data/helper/Resource";
import SectionModel from "../models/SectionModel";
import { PlaceModel } from "../models/placemodel";

export interface PlaceRepository{
    savePlace(placeModel: PlaceModel): Promise<Resource<SectionModel>>
}