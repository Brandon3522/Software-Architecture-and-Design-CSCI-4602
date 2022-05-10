"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Online_payment = void 0;
var readlineSync = require("readline-sync");
var Online_payment = /** @class */ (function () {
    function Online_payment() {
        this.email = '';
        this.payment_password = '';
        this.isValid = true;
    }
    Online_payment.prototype.getEmail = function () {
        return this.email;
    };
    Online_payment.prototype.setEmail = function (email) {
        this.email = email;
    };
    Online_payment.prototype.getPaymentPass = function () {
        return this.payment_password;
    };
    Online_payment.prototype.setPaymentPass = function (num) {
        this.payment_password = num;
    };
    Online_payment.prototype.obtain_info = function () {
        console.log('Enter Online Payment Details.');
        this.email = readlineSync.question('  Enter Your Email Address: ');
        this.payment_password = readlineSync.question('  Enter Your Payment Password: ');
        var info = [this.email, this.payment_password];
        return info;
    };
    Online_payment.prototype.validate_info = function () {
        var valid = /^[\w@.]+$/.test(this.email) && /\w+/.test(this.payment_password);
        return valid;
    };
    return Online_payment;
}());
exports.Online_payment = Online_payment;
