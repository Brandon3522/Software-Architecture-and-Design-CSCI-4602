"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Credit_card = void 0;
var readlineSync = require("readline-sync");
var Credit_card = /** @class */ (function () {
    function Credit_card() {
        this.name = '';
        this.card_number = '';
        this.expiration_date = '';
        this.isValid = true;
    }
    Credit_card.prototype.getName = function () {
        return this.name;
    };
    Credit_card.prototype.setName = function (name) {
        this.name = name;
    };
    Credit_card.prototype.getCardNum = function () {
        return this.card_number;
    };
    Credit_card.prototype.setCardNum = function (num) {
        this.card_number = num;
    };
    Credit_card.prototype.getExpiration = function () {
        return this.expiration_date;
    };
    Credit_card.prototype.setExpiration = function (expiration) {
        this.expiration_date = expiration;
    };
    Credit_card.prototype.obtain_info = function () {
        console.log('Enter Credit Card Payment Details.');
        this.name = readlineSync.question('  Name: ');
        this.card_number = readlineSync.question('  Credit Card Number: ');
        this.expiration_date = readlineSync.question('  Credit Card Expiration Date (MM/DD): ');
        var info = [this.name, this.card_number, this.expiration_date];
        return info;
    };
    Credit_card.prototype.validate_info = function () {
        var valid = /^[\w.' ]+$/.test(this.name) && /\d{15,16}/.test(this.card_number) && /\d\d\/\d\d/.test(this.expiration_date);
        return valid;
    };
    return Credit_card;
}());
exports.Credit_card = Credit_card;
