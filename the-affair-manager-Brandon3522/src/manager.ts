//your code goes here!
import { Member } from "./member"
import { Affair } from "./affair"
import { Organization } from "./organization";


export class AffairManager {
    private _name: string;
    private _memberList: Member[];
    private _affairList: Affair[];
    private _organizationList: Organization[];


    constructor(){
        this._memberList = [];
        this._affairList = [];
        this._organizationList = [];
    }

    public get name() : string {
        return this._name;
    }

    public set name(v : string) {
        this._name = v;
    }

    public get affairList(){
        return this._affairList;
    }

    public set affairList(affairList: Affair[]){
        this._affairList = affairList;
    }

    public get organizationList(){
        return this._organizationList;
    }

    public set organizationList(prgList: Organization[]){
        this._organizationList = this.organizationList;
    }

    public get memberList(){
        return this._memberList;
    }

    public set memberList(memberList: Member[]){
        this._memberList = memberList;
    }

    // Create new member
    // Add to member list
    public addMember(name: string, email: string): void {
        let member = new Member(name, email);
        this.memberList.push(member);         
    }

    public addAffair(affairName: string, location: string, time: string): void {
        let affair = new Affair(affairName, location, time);
        this.affairList.push(affair);
    }

    public addOrganization(orgName: string): void {
        let organization = new Organization(orgName);
        this.organizationList.push(organization);
    }

    // use helper search functions to consolidate
    // Use filter() function to help ?
    public searchMethod(memberName?: string, affairName?: string, organizationName?: string): string[]{
        if (memberName){
            let memberList = this.findMemberNames(memberName);
            return memberList;
        }

        else if (affairName){
            let affairList = this.findAffairNames(affairName);
            return affairList;
        }

        else if (organizationName){
            let orgList = this.findOrganizationNames(organizationName);
            return orgList;    
        }
        return;
    }

    // returning an empty list, not going into if statement
    public findMemberNames(memberName: string): string[]{
        let memList = [];
        for (let i = 0; i <= this._memberList.length - 1 ; i++) {
            if (this._memberList[i].mName == memberName)
                memList.push(this._memberList[i].mName);
        }
        return memList;
    }

    public findAffairNames(affairName: string): string[]{
        let affList = [];
        for (let i = 0; i <= this.affairList.length - 1; i++) {
            if (this.affairList[i].affairName == affairName)
                affList.push(this.affairList[i].affairName);
        }
        return affList;
    }

    public findOrganizationNames(organizationName: string): string[]{
        let orgList = [];
        for (let i = 0; i <= this.organizationList.length - 1; i++) {
            if (this.organizationList[i].orgName == organizationName)
                orgList.push(this.affairList[i].affairName);
        }
        return orgList;
    }

    // Add registered member to the affair
    // If member is in the affair already, throw error
    // Else, search for member name
    // If found, add member to affair
    public addMemberToAffair(memberName: string, affairName: string){
        let member = new Member();
        for (let index = 0; index <= this.affairList.length - 1; index++) {
            if (this.affairList[index].affairName == affairName){ //find affair name
                //search for member name in the affair
                if (this.affairList[index].getMemberName(memberName) == memberName){
                    console.log("Member already exists in the affair")
                    return;
                }
                else
                    for (let i = 0; i <= this._memberList.length - 1; i++) {
                        if (this._memberList[i].mName == memberName)
                            member = this._memberList[i];
                            //return member;
                    }
                    console.log("Member added.")
                    this.affairList[index].affairMemberList.push(member);       
            }
        }
    }
    
    // if newAffairName selected, modify affairName
    // if time selected, modify time
    public modifyAffair(affairName: string, newAffairName?: string, time?: string){
        //change affair name
        if(newAffairName){
            for (let i = 0; i <= this.affairList.length - 1; i++) {
                if (this.affairList[i].affairName == affairName){
                this.affairList[i].affairName = newAffairName;
                }
            }
        }
        //change affair time
        else if(time){
            for (let i = 0; i <= this.affairList.length - 1; i++) {
                if (this.affairList[i].affairName == affairName){
                    this.affairList[i].time = time;
                }
            }
        }
    }

    // Add registered affair to the organization
    // If affair is in the organization already, throw error
    // Else, search for affair name
    // If found, add affair to organization
    public addAffairToOrganization(affairName: string, organizationName: string){
        let affair = new Affair();
        for (let index = 0; index <= this.organizationList.length - 1; index++) {
            if (this.organizationList[index].orgName == organizationName){ //find org name
                //search for affair name in the org
                if (this.organizationList[index].getAffairName(affairName) == affairName){
                    console.log("Affair already exists in the organization")
                    return;
                }
                else
                    for (let i = 0; i <= this.affairList.length - 1; i++) {
                        if (this.affairList[i].affairName == affairName)
                            affair = this.affairList[i];
                    }
                    console.log("Affair added.")
                    this.organizationList[index].affairList.push(affair);
            }
        }
    }

    // List members in an affair, include email addresses
    // try map() function ?
    // used toString override to list members
    public getMembers(affairName: string): Member[]{
        for (let i = 0; i < this.affairList.length; i++) {
            if (this.affairList[i].affairName == affairName){
                let members = this.affairList[i].affairMemberList;
                return members;
            }
        }
    }

}













