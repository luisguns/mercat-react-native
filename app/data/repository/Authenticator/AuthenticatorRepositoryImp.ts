import { FirebaseError } from "firebase/app";
import { GoogleSignin, auth } from "../../../config/firebaseconfig";
import {
    FIREBASE_AUTH_ERROR_EMAIL_ALREADY_IN_USE,
    FIREBASE_AUTH_ERROR_INVALID_EMAIL,
    FIREBASE_AUTH_ERROR_UNKNOW,
    FIREBASE_AUTH_ERROR_WEAK_PASSWORD,
    UserLoginResponse,
} from "../../entity/UserLoginResponse";
import { Resource } from "../../helper/Resource";
import AuthenticatorRepository from "../../../domain/repository/AuthenticationRepository";
import { UserModel } from "../../../domain/models/UserModel";

export class AuthenticatorRepositoryImp implements AuthenticatorRepository {
    async createNewUseEmailAndPassword(
        email: string,
        password: string,
        name: string
    ): Promise<Resource<UserLoginResponse>> {
        return await auth()
            .createUserWithEmailAndPassword(email, password)
            .then((myUser) => {
                return myUser.user
                    .updateProfile({
                        displayName: name,
                    })
                    .then(() => {
                        return Resource.Success(
                            UserLoginResponse.createSuccesLogin(
                                myUser.user.email,
                                myUser.user.displayName,
                                myUser.user.uid
                            )
                        );
                    });
            })
            .catch((e) => {
                const error = e as { code: string };
                console.log(error.code);

                if (error.code === "auth/weak-password") {
                    return Resource.Error({
                        code: FIREBASE_AUTH_ERROR_WEAK_PASSWORD.code,
                        mensage: FIREBASE_AUTH_ERROR_WEAK_PASSWORD.menssage,
                    });
                }
                if (error.code === "auth/email-already-in-use") {
                    return Resource.Error({
                        code: FIREBASE_AUTH_ERROR_EMAIL_ALREADY_IN_USE.code,
                        mensage:
                            FIREBASE_AUTH_ERROR_EMAIL_ALREADY_IN_USE.menssage,
                    });
                }
                if (error.code === "auth/invalid-email") {
                    return Resource.Error({
                        code: FIREBASE_AUTH_ERROR_INVALID_EMAIL.code,
                        mensage: FIREBASE_AUTH_ERROR_INVALID_EMAIL.menssage,
                    });
                }

                if (error.code === "auth/invalid-email") {
                    return Resource.Error({
                        code: FIREBASE_AUTH_ERROR_INVALID_EMAIL.code,
                        mensage: FIREBASE_AUTH_ERROR_INVALID_EMAIL.menssage,
                    });
                } else {
                    return Resource.Error({
                        code: FIREBASE_AUTH_ERROR_UNKNOW.code,
                        mensage: FIREBASE_AUTH_ERROR_UNKNOW.menssage,
                    });
                }
            });
    }

    async loginWithEmailAndPassword(
        email: string,
        password: string
    ): Promise<Resource<UserLoginResponse>> {
        return await auth().signInWithEmailAndPassword(email,password)
        .then((user) => {
            return Resource.Success(
                UserLoginResponse.createSuccesLogin(
                    user.user.email,
                    user.user.displayName,
                    user.user.uid
                )
            );
        })
        .catch( (e) => {
            console.log(e)
            return Resource.Error({
                code: FIREBASE_AUTH_ERROR_UNKNOW.code,
                mensage: FIREBASE_AUTH_ERROR_UNKNOW.menssage,
            });
        })
    }

    async singInWithGoogle(): Promise<Resource<UserLoginResponse>> {
        try {
            await GoogleSignin.hasPlayServices({
                showPlayServicesUpdateDialog: true,
            });
            const { idToken } = await GoogleSignin.signIn();
            
            const googleCredential = auth.GoogleAuthProvider.credential(idToken);
            return await auth()
                .signInWithCredential(googleCredential)
                .then((response) => {
                    return Resource.Success(
                        UserLoginResponse.createSuccesLogin(
                            response.user.email,
                            response.user.displayName,
                            response.user.uid
                        )
                    );
                })
                .catch((e) => {
                    console.log(e)
                    const error = e as { code: string };
                    console.log(error.code);
                    return Resource.Error({
                        code: FIREBASE_AUTH_ERROR_UNKNOW.code,
                        mensage: FIREBASE_AUTH_ERROR_UNKNOW.menssage,
                    });
                });
        } catch (e) {
            return Resource.Error({
                code: FIREBASE_AUTH_ERROR_UNKNOW.code,
                mensage: FIREBASE_AUTH_ERROR_UNKNOW.menssage,
            });
        }
    }
}
