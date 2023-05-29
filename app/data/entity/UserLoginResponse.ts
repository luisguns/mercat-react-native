export const FIREBASE_AUTH_ERROR_WEAK_PASSWORD = {code: 10, menssage: "Senha fraca, digite uma senha mais forte"}
export const FIREBASE_AUTH_ERROR_INVALID_EMAIL = {code: 20, menssage: "Email invalido, digite um email valido"}
export const FIREBASE_AUTH_ERROR_EMAIL_ALREADY_IN_USE = {code: 30, menssage: "Email ja em uso"}
export const FIREBASE_AUTH_ERROR_UNKNOW = {code: 500, menssage: "Erro desconhecido, tente novamente mais tarde"}


type errorAuth = {
    message: string | null,
    code: string | null
}

export type userSuccesLogin = {
    email: string | null,
    displayname: string | null,
    uid: string | null
}

export class UserLoginResponse {
    error?: errorAuth
    success?: userSuccesLogin

    static createSuccesLogin(email: string | null, displayname: string | null, uid: string | null) : UserLoginResponse {
        const userLogin = new UserLoginResponse()
        userLogin.success = {displayname: displayname, email: email, uid: uid}
        return userLogin
    }

    static createErrorAuth(message: string | null, code: string | null) : UserLoginResponse {
        const errorAuth = new UserLoginResponse()
        errorAuth.error = {message: message, code: code}
        return errorAuth
    }
}