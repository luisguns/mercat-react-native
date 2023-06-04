import { UiState } from "./UiState";

export class Obeservable <E> {
    
    observable?: (value: UiState<E>) => undefined
    
    emit<T extends UiState<E>>(data: T) {
       if(this.observable) {
        this.observable(data)
       } else {
        throw Error("Observer not atached")
       }
    }

    observe(callback: (value: UiState<E>) => undefined) {
        this.observable = callback
    }

    detach() {
        this.observable = undefined
    }

}