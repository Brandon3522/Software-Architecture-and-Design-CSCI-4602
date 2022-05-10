import { IPayment } from "./IPayment";
import readlineSync = require('readline-sync');

export class Offline_payment implements IPayment {
    private name: string;
    private billing_address: string;
    public isValid: boolean;

    public getName(){
        return this.name;
    }

    public setName(name: string){
        this.name = name;
    }

    public getBillingAddress(){
        return this.billing_address;
    }

    public setBillingAddress(address: string){
        this.billing_address = address;
    }

    constructor(){
        this.name = '';
        this.billing_address = '';
        this.isValid = true;
    }

    public obtain_info(): string[]{
        console.log('Enter Offline Payment Details.');
        this.name = readlineSync.question('  Name: ');
        this.billing_address = readlineSync.question('  Enter Your Billing Address: ');
        let info = [this.name, this.billing_address];
        return info;
    }

    public validate_info(): boolean{
        let valid = /^[\w.' ]+$/.test(this.name) && /^[\w.' ]+$/.test(this.billing_address);
        return valid;
    }

}