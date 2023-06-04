import SectionRepositoryImp from "../../data/repository/SectionRepository/SectionRepositoryImp";
import SectionUseCase from "../../domain/usecases/SectionUseCase";


export class SectionDI {

    static getSectionUseCase(): SectionUseCase {
        return new SectionUseCase(new SectionRepositoryImp())
    }

}