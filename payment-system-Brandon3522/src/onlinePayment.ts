import { IPayment } from "./IPayment";
import readlineSync = require('readline-sync');

export class Online_payment implements IPayment {
    private email: string;
    private payment_password: string;
    public isValid: boolean;

    public getEmail(){
        return this.email;
    }

    public setEmail(email: string){
        this.email = email;
    }

    public getPaymentPass(){
        return this.payment_password;
    }

    public setPaymentPass(num: string){
        this.payment_password = num;
    }

    constructor(){
        this.email = '';
        this.payment_password = '';
        this.isValid = true;
    }

    public obtain_info(): string[]{
        console.log('Enter Online Payment Details.');
        this.email = readlineSync.question('  Enter Your Email Address: ');
        this.payment_password = readlineSync.question('  Enter Your Payment Password: ');
        let info = [this.email, this.payment_password];
        return info;
    }

    public validate_info(): boolean{
        let valid = /^[\w@.]+$/.test(this.email) && /\w+/.test(this.payment_password);
        return valid;
    }

}
