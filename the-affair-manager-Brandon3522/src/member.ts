

export class Member{
    private _mName: string;
    private _email: string;
    
    
    public get mName(): string {
        return this._mName;
    }
    public set mName(name: string) {
        this._mName = name;
    }

    public get email(): string {
        return this._email;
    }
    public set email(email: string) {
        this._email = email;
    }

    constructor(name?: string, email?: string){
        this._mName = name;
        this._email = email;
    }

    public toString = () : string => {
        return `Member: ${this.mName} Email: ${this.email}`;
    }

}









