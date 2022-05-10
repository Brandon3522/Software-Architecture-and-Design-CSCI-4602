"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentSystemExecutor = void 0;
var PaymentSystemExecutor = /** @class */ (function () {
    function PaymentSystemExecutor(paymentStrategy) {
        this.paymentStategy = paymentStrategy;
    }
    PaymentSystemExecutor.prototype.setPaymentStrategy = function (paymentStategy) {
        this.paymentStategy = paymentStategy;
    };
    PaymentSystemExecutor.prototype.execute = function () {
        var payment = this.paymentStategy;
        payment.obtain_info();
        if (payment.validate_info()) {
            console.log("Your payment information is being encrypted.");
            console.log("The payment is being processed.");
        }
        else {
            console.log('The payment is invalid.');
        }
    };
    return PaymentSystemExecutor;
}());
exports.PaymentSystemExecutor = PaymentSystemExecutor;
