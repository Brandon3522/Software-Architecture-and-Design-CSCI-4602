import { IPayment } from "./IPayment";
import readlineSync = require('readline-sync');

export class Credit_card implements IPayment {
    private name: string;
    private card_number: string;
    private expiration_date: string;
    public isValid: boolean;

    public getName(){
        return this.name;
    }

    public setName(name: string){
        this.name = name;
    }

    public getCardNum(){
        return this.card_number;
    }

    public setCardNum(num: string){
        this.card_number = num;
    }

    public getExpiration(){
        return this.expiration_date;
    }

    public setExpiration(expiration: string){
        this.expiration_date = expiration;
    }

    constructor(){
        this.name = '';
        this.card_number = '';
        this.expiration_date = ''
        this.isValid = true;
    }

    public obtain_info(): string[]{
        console.log('Enter Credit Card Payment Details.');
        this.name = readlineSync.question('  Name: ');
        this.card_number = readlineSync.question('  Credit Card Number: ');
        this.expiration_date = readlineSync.question('  Credit Card Expiration Date (MM/DD): ');
        let info = [this.name, this.card_number, this.expiration_date];
        return info;
    }

    public validate_info(): boolean{
        let valid = /^[\w.' ]+$/.test(this.name) && /\d{15,16}/.test(this.card_number) && /\d\d\/\d\d/.test(this.expiration_date);
        return valid;
    }

}