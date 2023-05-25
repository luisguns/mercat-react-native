import { UserLoginResponse } from "../../data/entity/UserLoginResponse";
import { Resource } from "../../data/helper/Resource";
import { UserModel } from "../models/UserModel";

export default interface AuthenticatorRepository {

    createNewUseEmailAndPassword(
        email: string,
        password: string,
        name: string
      ): Promise<Resource<UserLoginResponse>>

    loginWithEmailAndPassword(email: string, password: string): Promise<Resource<UserLoginResponse>>

    singInWithGoogle(): Promise<Resource<UserLoginResponse>>
}