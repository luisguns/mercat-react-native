
export type UiErrorModel = {
    code?: Number,
    mensage?: String
}

export class UiState<T>{
    loading?: boolean
    data?: T
    error?: UiErrorModel

    static UiStateSuccess<T> (data: T): UiState<T> {
        return new SuccessUiState<T>(data)
    }

    static UiStateError<T> (error: UiErrorModel): UiState<T> {
        return new ErrorUiState<T>(error)
    }

    static UiStateLoading<T> (): UiState<T> {
        return new LoadingUiState<T>()
    }
}

export class SuccessUiState<T> extends UiState<T> {
    constructor (data: T) {
        super()
        this.data = data
    }
}

export class ErrorUiState<T> extends UiState<T> {
    constructor (error: UiErrorModel) {
        super()
        this.error = error
    }
}

export class LoadingUiState<T> extends UiState<T> {
    constructor () {
        super()
        this.loading = true
    }
}