import { AuthenticatorRepositoryImp } from "../../data/repository/Authenticator/AuthenticatorRepositoryImp";
import AuthenticatorRepository from "../../domain/repository/AuthenticationRepository";


export class AuthDI {

    static getAuthenticationRepositoy(): AuthenticatorRepository {
        return new AuthenticatorRepositoryImp()
    }

}