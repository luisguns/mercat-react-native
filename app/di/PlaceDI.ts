import { PlaceRepositoryImp } from "../data/repository/PlaceRepositoyImp";
import { PlaceUsecase } from "../domain/usecases/PlaceUsecase";

export class PlaceDI {

    static getPlaceUsecase(): PlaceUsecase {
        return new PlaceUsecase(new PlaceRepositoryImp())
    }

}