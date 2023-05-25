import { UserLoginResponse } from "../../../data/entity/UserLoginResponse";
import { ErrorResource, SuccessResource } from "../../../data/helper/Resource";
import { UserModel } from "../../../domain/models/UserModel";
import AuthenticationUseCase from "../../../domain/usecases/AuthenticationUseCase";
import { Obeservable } from "../../../helper/Observer";
import { LoadingUiState, UiState } from "../../../helper/UiState";

export class AuthenticationController {
    authUsecase = new AuthenticationUseCase();

    newUseObservable = new Obeservable<UserLoginResponse>();
    loginObservable = new Obeservable<UserLoginResponse>();

    async createNewUserWithEmailAndPassword(
        email: string,
        password: string,
        name: string
    ) {
        this.newUseObservable.emit(UiState.UiStateLoading<UserLoginResponse>());
        await this.authUsecase
            .createNewUserWithEmailAndPassword(email, password, name)
            .then((response) => {
                if (response instanceof SuccessResource) {
                    this.newUseObservable.emit(
                        UiState.UiStateSuccess(response.data)
                    );
                } else if (response instanceof ErrorResource) {
                    this.newUseObservable.emit(
                        UiState.UiStateError<UserLoginResponse>({
                            code: response.error?.code,
                            mensage: response.error?.mensage,
                        })
                    );
                }
            })
            .catch((e) => {
                this.newUseObservable.emit(
                    UiState.UiStateError<UserLoginResponse>({
                        code: -1,
                        mensage: "UNKNOW ERROR",
                    })
                );
            });
    }

    async singInWithGoogle() {
        this.loginObservable.emit(UiState.UiStateLoading<UserLoginResponse>())
        await this.authUsecase.singInWithGoogle()
        .then((value) => {
            if (value instanceof SuccessResource) {
                this.loginObservable.emit(UiState.UiStateSuccess<UserLoginResponse>(value.data))
            } else if (value instanceof ErrorResource) {
                console.error(value.error)
                this.loginObservable.emit(UiState.UiStateError<UserLoginResponse>(value.toUiError()))
            }
        }).catch((e) => {
            console.error(e)
            this.loginObservable.emit(UiState.UiStateError<UserLoginResponse>(
                {
                    mensage: e,
                    code: -1
                }
            ))
            
        })
    }

    async singInWithEmail(email: string, password: string) {
        await this.authUsecase.singInWithEmailAndPassword(email, password)
        .then((value) => {
            if (value instanceof SuccessResource) {
                this.loginObservable.emit(UiState.UiStateSuccess<UserLoginResponse>(value.data))
            } else if (value instanceof ErrorResource) {
                console.error(value.error)
                this.loginObservable.emit(UiState.UiStateError<UserLoginResponse>(value.toUiError()))
            }
        })
        .catch((e) => {
            console.error(e)
            this.loginObservable.emit(UiState.UiStateError<UserLoginResponse>(
                {
                    mensage: e,
                    code: -1
                }
            ))
        })
    }
}
