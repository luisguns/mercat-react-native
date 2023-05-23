import { UserLoginResponse } from "../../data/entity/UserLoginResponse";
import { Resource } from "../../data/helper/Resource";
import { AuthDI } from "../../di/Authentication/AuthDI";
import AuthenticatorRepository from "../repository/AuthenticationRepository";

export default class AuthenticationUseCase {
  authRepository: AuthenticatorRepository;
  constructor() {
    this.authRepository = AuthDI.getAuthenticationRepositoy();
  }

  async createNewUserWithEmailAndPassword(
    email: string,
    password: string,
    name: string
  ): Promise<Resource<UserLoginResponse>> {
    return await this.authRepository.createNewUseEmailAndPassword(
      email,
      password,
      name
    );
  }
}
