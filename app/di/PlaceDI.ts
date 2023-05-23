import { PlaceRepositoryImp } from "../data/repository/PlaceRepository/PlaceRepositoyImp";
import { PlaceUsecase } from "../domain/usecases/PlaceUsecase";

export class PlaceDI {

    static getPlaceUsecase(): PlaceUsecase {
        return new PlaceUsecase(new PlaceRepositoryImp())
    }

}