import { PlaceModel } from "../../../domain/models/placemodel";
import { PlaceRepository } from "../../../domain/repository/PlaceRepository";
import {
    ErrorResource,
    Resource,
    SuccessResource,
} from "../../helper/Resource";
import { firestore } from "../../../config/firebaseconfig";
import {
    doc,
    writeBatch,
    collection,
    deleteDoc,
    getDocs,
} from "firebase/firestore";
import CardModel from "../../../domain/models/CardModel";
import SectionModel from "../../../domain/models/SectionModel";
import { FirebaseError } from "@firebase/util";
import PlaceNamePage from "../../../presentation/pages/place/placenamepage";
import Collections from "../../service/Collections.json";

export class PlaceRepositoryImp implements PlaceRepository {
    getFavoritePlaces(uid: string): Promise<Resource<PlaceModel[]>> {
        return firestore()
            .collection(Collections.place_collection)
            .where("uid", "==", uid)
            .where("favorite", "==", true)
            .get()
            .then((value) => {
                const placeList: PlaceModel[] = [];
                value.forEach((responseItem) => {
                    const item = responseItem.data() as PlaceModel;
                    if (item) {
                        placeList.push(item);
                    }
                });
                return Resource.Success(placeList);
            })
            .catch((e) => {
                const error = e as { code: string; cause: string };
                return Resource.Error({
                    code: -1,
                    mensage: error.cause,
                });
            });
    }
    async savePlace(
        placeModel: PlaceModel,
        uid: string
    ): Promise<Resource<SectionModel>> {
        let resoucer: Resource<SectionModel> = new ErrorResource<SectionModel>({
            code: -1,
            mensage: "UNKNOW ERROR",
        });
        try {
            const batch = firestore().batch();

            //Collections
            const placeCollection = firestore().collection("place").doc();
            const cardCollection = firestore().collection("card").doc();
            const sectionCollection = firestore().collection("section").doc();
            const favoritePlaceCollection = firestore().collection("favorite_place").doc();

            //Refs
            placeModel.id = placeCollection.id;

            const cardModel = new CardModel();
            cardModel.id = cardCollection.id;

            const sectionModel = new SectionModel(
                placeCollection.id,
                cardCollection.id,
                placeModel.nome,
                placeModel.getCompleteAddres(),
                uid
            );
            sectionModel.id = sectionCollection.id;

            batch.set(placeCollection, placeModel.toObject());
            batch.set(cardCollection, cardModel.toObject());
            batch.set(sectionCollection, sectionModel.toObject());

            if(placeModel.favorite) {
                batch.set(favoritePlaceCollection, {
                    idPlace: placeCollection.id,
                    idUsuario: uid
                })
            }

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
}
