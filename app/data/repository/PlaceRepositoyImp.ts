import { PlaceModel } from "../../domain/models/placemodel";
import { PlaceRepository } from "../../domain/repository/PlaceRepository";
import { ErrorResource, Resource, SuccessResource } from "../helper/Resource";
import { firestore } from "../../config/firebaseconfig";
import {
  doc,
  writeBatch,
  collection,
  deleteDoc,
  getDocs,
} from "firebase/firestore";
import CardModel from "../../domain/models/CardModel";
import SectionModel from "../../domain/models/SectionModel";
import { FirebaseError } from "@firebase/util";
import PlaceNamePage from "../../presentation/pages/place/placenamepage";

export class PlaceRepositoryImp implements PlaceRepository {
  async savePlace(placeModel: PlaceModel): Promise<Resource<SectionModel>> {
    let resoucer: Resource<SectionModel> = new ErrorResource<SectionModel>({
      code: -1,
      mensage: "UNKNOW ERROR",
    });
    try {
      const batch = writeBatch(firestore);

      //Collections
      const placeCollection = collection(firestore, "place");
      const cardCollection = collection(firestore, "card");
      const sectionCollection = collection(firestore, "section");

      //Refs
      const placeRef = doc(placeCollection);
      placeModel.id = placeRef.id;

      const cardRef = doc(cardCollection);
      const cardModel = new CardModel();
      cardModel.id = cardRef.id;

      const sectionRef = doc(sectionCollection);
      const sectionModel = new SectionModel(placeRef.id, cardRef.id, placeModel.nome, placeModel.getCompleteAddres());
      sectionModel.id = sectionRef.id;

      batch.set(placeRef, placeModel.toObject());
      batch.set(cardRef, cardModel.toObject());
      batch.set(sectionRef, sectionModel.toObject());

      await this.deleteAllSection(true).catch((e) => {
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

  async deleteAllSection(deleteCard: boolean) {
    const query = await getDocs(collection(firestore, "section"));
    query.forEach((element) => {
      const section = (element.data() as SectionModel)
      const deleteBatch = writeBatch(firestore)
      deleteBatch.delete(element.ref)
      if(deleteCard){
        deleteBatch.delete(doc(firestore, 'card', section.card))
      }
      deleteBatch.commit()
    });
  }
}
