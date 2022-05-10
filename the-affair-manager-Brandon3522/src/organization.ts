import { Affair } from "./affair";  

export class Organization {
    private _orgName: string;
    private _affairList: Affair[];


    constructor(orgName?: string){
        this._orgName = orgName;
        this._affairList = [];
    }

    public get orgName() : string {
        return this._orgName;
    }

    public set orgName(v : string) {
        this._orgName = v;
    }

    public get affairList() {
        return this._affairList;
    }
    
    public set affairList(v : Affair[]) {
        this._affairList = v;
    }
    
    // search for affair name in organization
    // if found, return affair
    public getAffairName(affairName: string): string{
        let affair = "";
        for (let i = 0; i <= this.affairList.length - 1; i++) {
            if (this.affairList[i].affairName == affairName){
                affair = this.affairList[i].affairName;
            }
        }
            return affair;
    }

}