import { PlaceModel } from "../../domain/models/placemodel";
import { PlaceRepository } from "../../domain/repository/PlaceRepository";
import { Resource } from "../helper/Resource";
import { firestore } from "../../config/firebaseconfig";
import { addDoc, collection } from "firebase/firestore";

export class PlaceRepositoryImp implements PlaceRepository {
  async savePlace(placeModel: PlaceModel): Promise<Resource<String>> {
    try {
      const placeDoc = await addDoc(
        collection(firestore, "placesmodel"),
        placeModel.toObject()
      );
      console.log("Document written with ID: ", placeDoc.id);
      return Resource.Success(placeDoc.id)
    } catch (e) {
      console.log("Error", (e as Error).message);
      return Resource.Error({code: 8, mensage: "Error"})
    }
  }
}
