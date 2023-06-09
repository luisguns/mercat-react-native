import { UiErrorModel } from "../../helper/UiState"

export class Resource<T>{
    data?: T
    error?: { code: Number, mensage: String}

    static Success<T>(data: T) { return new SuccessResource<T>(data)}
    static Error<T>(error: { code: Number, mensage: String}) { return new ErrorResource<T>(error)}

    toUiError(): UiErrorModel {
        return {
            code: this.error?.code,
            mensage: this.error?.mensage
        }
    }

}

export class SuccessResource<T> extends Resource<T>{
    constructor (successData: T) {
        super()
        this.data = successData
    }
}

export class ErrorResource<T> extends Resource<T>{
    constructor (error: { code: Number, mensage: String}) {
        super()
        this.error = error
    }
}