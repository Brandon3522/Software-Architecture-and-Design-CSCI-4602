import { IPayment } from "./IPayment";
import readlineSync = require('readline-sync');
import { Credit_card } from "./creditCard"; 

export class PaymentSystemExecutor{

    private paymentStategy: IPayment;

    constructor(paymentStrategy: IPayment){
        this.paymentStategy = paymentStrategy;
    }

    public setPaymentStrategy(paymentStategy: IPayment){
        this.paymentStategy = paymentStategy;
    }

    public execute(): void{
        let payment = this.paymentStategy;
        payment.obtain_info();

        if (payment.validate_info()) {
            console.log("Your payment information is being encrypted.");
      
            console.log("The payment is being processed.")
        }
        else {
            console.log('The payment is invalid.');
        }
    }
}