import { Resource } from "../../data/helper/Resource";
import { PlaceModel } from "../models/placemodel";

export interface PlaceRepository{
    savePlace(placeModel: PlaceModel): Promise<Resource<String>> 
}