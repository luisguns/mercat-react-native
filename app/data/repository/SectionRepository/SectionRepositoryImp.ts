import { FirebaseError } from "firebase/app";
import { firestore } from "../../../config/firebaseconfig";
import CardModel from "../../../domain/models/CardModel";
import SectionModel from "../../../domain/models/SectionModel";
import { PlaceModel } from "../../../domain/models/placemodel";
import SectionRepository from "../../../domain/repository/SectionRepository";
import { ErrorResource, Resource, SuccessResource } from "../../helper/Resource";
import Collections from "../../service/Collections.json"

export default class SectionRepositoryImp implements SectionRepository {



    async createNewSectionWithPlace(placeModel: PlaceModel, uid: string): Promise<Resource<SectionModel>> {
        let resoucer: Resource<SectionModel> = new ErrorResource<SectionModel>({
            code: -1,
            mensage: "UNKNOW ERROR",
        });
        try {
            const batch = firestore().batch();

            

            //Collections
            const cardCollection = firestore().collection("card").doc();
            const sectionCollection = firestore().collection("section").doc();

            const cardModel = new CardModel();
            cardModel.id = cardCollection.id;
            const sectionModel = new SectionModel(
                placeModel.id.toString(),
                cardCollection.id,
                placeModel.nome,
                PlaceModel.getCompleteAddress(placeModel),
                uid
            );
            sectionModel.id = sectionCollection.id;
            batch.set(cardCollection, cardModel.toObject());
            batch.set(sectionCollection, sectionModel.toObject());

            await this.deleteAllSection(uid, true).catch((e) => {
                return new ErrorResource<SectionModel>({
                    code: 3,
                    mensage: "Erro ao criar nova seção seção",
                });
            });

            await batch
                .commit()
                .then((value) => {
                    resoucer = new SuccessResource<SectionModel>(sectionModel);
                })
                .catch((e) => {
                    if (e instanceof FirebaseError) {
                        resoucer = new ErrorResource<SectionModel>({
                            code: 1,
                            mensage: "savePlace FIREBASE ERROR: " + e.message,
                        });
                    }
                    resoucer = new ErrorResource<SectionModel>({
                        code: 1,
                        mensage: "savePlace FIREBASE ERROR: NO CAPTURE ERROR",
                    });
                });
        } catch (e) {
            if (e instanceof Error) {
                console.error(e)
                resoucer = new ErrorResource<SectionModel>({
                    code: 2,
                    mensage: "savePlace CATCH ERROR : " + e.message,
                });
            } else {
                resoucer = new ErrorResource<SectionModel>({
                    code: 1,
                    mensage: "savePlace FIREBASE ERROR: NO CAPTURE ERROR",
                });
            }
        }
        return resoucer;
    }

    async deleteAllSection(uid: string, deleteCard: boolean) {
        const query = await firestore()
            .collection("section")
            .where("userId", "==", uid)
            .get();
        query.forEach((element) => {
            const section = element.data() as SectionModel;
            const deleteBatch = firestore().batch();
            deleteBatch.delete(element.ref);
            if (deleteCard) {
                deleteBatch.delete(
                    firestore().collection("card").doc(section.card)
                );
            }
            deleteBatch.commit();
        });
    }


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