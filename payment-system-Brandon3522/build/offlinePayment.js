"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Offline_payment = void 0;
var readlineSync = require("readline-sync");
var Offline_payment = /** @class */ (function () {
    function Offline_payment() {
        this.name = '';
        this.billing_address = '';
        this.isValid = true;
    }
    Offline_payment.prototype.getName = function () {
        return this.name;
    };
    Offline_payment.prototype.setName = function (name) {
        this.name = name;
    };
    Offline_payment.prototype.getBillingAddress = function () {
        return this.billing_address;
    };
    Offline_payment.prototype.setBillingAddress = function (address) {
        this.billing_address = address;
    };
    Offline_payment.prototype.obtain_info = function () {
        console.log('Enter Offline Payment Details.');
        this.name = readlineSync.question('  Name: ');
        this.billing_address = readlineSync.question('  Enter Your Billing Address: ');
        var info = [this.name, this.billing_address];
        return info;
    };
    Offline_payment.prototype.validate_info = function () {
        var valid = /^[\w.' ]+$/.test(this.name) && /^[\w.' ]+$/.test(this.billing_address);
        return valid;
    };
    return Offline_payment;
}());
exports.Offline_payment = Offline_payment;
