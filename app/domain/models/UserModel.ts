export class UserModel {
    name?: string | null
    email?: string | null
    uid?: string | null

    constructor (uid?: string | null, email?: string | null, name?: string | null){
        this.name = name
        this.email = email
        this.uid = uid
    }
}