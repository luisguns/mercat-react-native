import { firestore } from "../../../config/firebaseconfig";
import SectionModel from "../../../domain/models/SectionModel";
import SectionRepository from "../../../domain/repository/SectionRepository";
import { Resource } from "../../helper/Resource";
import Collections from "../../service/Collections.json"

export default class SectionRepositoryImp implements SectionRepository {
    async getSectionByUid(uid: string): Promise<Resource<SectionModel[]>> {
        return await firestore()
        .collection(Collections.section_collection)
        .where('userId', '==', uid)
        .get()
        .then((response) => {
            const sectionList: SectionModel[] = []
            response.forEach((responseItem) => {
                const item = (responseItem.data() as SectionModel)
                if(item) {
                    sectionList.push(item)
                }
            })
            return Resource.Success(sectionList)
        })
        .catch((e) => {
            const error = e as {code: string, cause: string}
            return Resource.Error({
                code: -1,
                mensage: error.cause
            })
        })
    }
    finishSection(sectionId: string): Promise<Resource<SectionModel>> {
        throw new Error("Method not implemented.");
    }

}