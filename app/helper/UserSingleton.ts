import { userSuccesLogin } from "../data/entity/UserLoginResponse";

export default class UserSingleton {
    private static _instance: UserSingleton;

    private _uid: string = ""
    private _email: string = ""
    private _name: string = ""

    private constructor()
    {
        //...
    }

    public static get Instance()
    {
        // Do you need arguments? Make it a regular static method instead.
        return this._instance || (this._instance = new this());
    }

    public set uid(uid: string) {this._uid = uid}
    public set email(email: string) {this._email = email}
    public set name(name: string) {this._name = name}
    public get uid() {return this._uid}
    public get email() {return this._email}
    public get name() {return this._name}

    fromUserLogin(user?: userSuccesLogin) {
        if(user) {
            this._uid = user.uid ? user.uid : ""
            this._name = user.displayname ? user.displayname : ""
            this._email = user.email ? user.email : ""
        }
    }
}