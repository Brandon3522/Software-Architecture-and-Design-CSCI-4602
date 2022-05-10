import { PaymentSystemExecutor } from './paymentSystemExecutor';
import { Credit_card } from './creditCard';

let paymentSystemExecutor = new PaymentSystemExecutor(new Credit_card());
paymentSystemExecutor.execute();

console.log("Test");