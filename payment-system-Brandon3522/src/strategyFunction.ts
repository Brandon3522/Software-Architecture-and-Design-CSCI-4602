import { Bank_draft } from "./bankDraft";
import { Credit_card } from "./creditCard"; 
import { Online_payment } from "./onlinePayment";
import { Offline_payment } from "./offlinePayment";
import { PaymentSystemExecutor } from "./paymentSystemExecutor";

export class payment_selection{
    public static payment_selection(paymentType: string){
        switch (paymentType) {
            case "credit card":
                let paymentSystemExecutor = new PaymentSystemExecutor(new Credit_card());
                paymentSystemExecutor.execute();
                break;
            case "bank draft":
                let paymentSystemExecutor1 = new PaymentSystemExecutor(new Bank_draft());
                paymentSystemExecutor1.execute();
                 break;
            case "online":
                let paymentSystemExecutor2 = new PaymentSystemExecutor(new Online_payment());
                paymentSystemExecutor2.execute();
                break;
            case "offline":
                let paymentSystemExecutor3 = new PaymentSystemExecutor(new Offline_payment());
                paymentSystemExecutor3.execute();
                break;
            default:
                break;
        }
    }
}
