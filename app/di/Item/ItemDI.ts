import ItemRepositoryImp from "../../data/repository/ItemRepository/ItemRepositoryImp";
import ItemUsecase from "../../domain/usecases/ItemUsecase";

export class ItemDI {

    static getItemUsecase(): ItemUsecase {
        return new ItemUsecase(new ItemRepositoryImp())
    }

}