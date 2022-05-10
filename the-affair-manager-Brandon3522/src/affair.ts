//import { Console } from "console";
import { AffairManager } from "./manager";
import { Member } from "./member";

export class Affair {
    private _affairName: string;
    private _time: string;
    private _location: string;
    private _affairMemberList: Member[]


    public get affairMemberList() : Member [] {
        return this._affairMemberList;
    }

    public set affairMemberList(affairMemberList : Member []) {
        this._affairMemberList = affairMemberList;
    }

    public get time() : string {
        return this._time;
    }

    public set time(v : string) {
        this._time = v;
    }

    public get location() : string {
        return this._location;
    }
    
    public set location(v : string) {
        this._location = v;
    }
    
    public get affairName() : string {
        return this._affairName;
    }
    public set affairName(v : string) {
        this._affairName = v;
    }

    constructor(affairName?: string, location?: string, time?: string){
        this._affairName = affairName;
        this.time = time;
        this.location = location;
        this._affairMemberList = [];
    }

    // search for member in affair
    // if found, return member
    public getMemberName(memberName: string): string{
        let member = "";
        for (let i = 0; i <= this._affairMemberList.length - 1; i++) {
            if (this._affairMemberList[i].mName == memberName){
                member = this._affairMemberList[i].mName;
            }
        }
            return member;
    }

}