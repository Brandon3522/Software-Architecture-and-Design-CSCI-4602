"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.payment_selection = void 0;
var bankDraft_1 = require("./bankDraft");
var creditCard_1 = require("./creditCard");
var onlinePayment_1 = require("./onlinePayment");
var offlinePayment_1 = require("./offlinePayment");
var paymentSystemExecutor_1 = require("./paymentSystemExecutor");
var payment_selection = /** @class */ (function () {
    function payment_selection() {
    }
    payment_selection.payment_selection = function (paymentType) {
        switch (paymentType) {
            case "credit card":
                var paymentSystemExecutor = new paymentSystemExecutor_1.PaymentSystemExecutor(new creditCard_1.Credit_card());
                paymentSystemExecutor.execute();
                break;
            case "bank draft":
                var paymentSystemExecutor1 = new paymentSystemExecutor_1.PaymentSystemExecutor(new bankDraft_1.Bank_draft());
                paymentSystemExecutor1.execute();
                break;
            case "online":
                var paymentSystemExecutor2 = new paymentSystemExecutor_1.PaymentSystemExecutor(new onlinePayment_1.Online_payment());
                paymentSystemExecutor2.execute();
                break;
            case "offline":
                var paymentSystemExecutor3 = new paymentSystemExecutor_1.PaymentSystemExecutor(new offlinePayment_1.Offline_payment());
                paymentSystemExecutor3.execute();
                break;
            default:
                break;
        }
    };
    return payment_selection;
}());
exports.payment_selection = payment_selection;
