import { IPayment } from "./IPayment";
import readlineSync = require('readline-sync');

export class Bank_draft implements IPayment {
    private name: string;
    private route_number: string;
    private account_number: string;
    public isValid: boolean;

    public getName(){
        return this.name;
    }

    public setName(name: string){
        this.name = name;
    }

    public getRouteNum(){
        return this.route_number;
    }

    public setRouteNum(num: string){
        this.route_number = num;
    }

    public getAccountNum(){
        return this.account_number;
    }

    public setAccountNum(expiration: string){
        this.account_number = expiration;
    }

    constructor(){
        this.name = '';
        this.route_number = '';
        this.account_number = ''
        this.isValid = true;
    }

    public obtain_info(): string[]{
        console.log('Enter Bank Account Details.');
        this.name = readlineSync.question('  Name: ');
        this.route_number = readlineSync.question('  Bank Routing Number: ');
        this.account_number = readlineSync.question('  Bank Account Number: ');
        let info = [this.name, this.route_number, this.account_number];
        return info;
    }

    public validate_info(): boolean{
        let valid = /^[\w.' ]+$/.test(this.name) && /\d{9}/.test(this.route_number) && /\d{6,12}/.test(this.account_number);
        return valid;
    }

}


