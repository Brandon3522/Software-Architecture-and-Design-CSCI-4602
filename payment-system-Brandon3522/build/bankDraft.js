"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bank_draft = void 0;
var readlineSync = require("readline-sync");
var Bank_draft = /** @class */ (function () {
    function Bank_draft() {
        this.name = '';
        this.route_number = '';
        this.account_number = '';
        this.isValid = true;
    }
    Bank_draft.prototype.getName = function () {
        return this.name;
    };
    Bank_draft.prototype.setName = function (name) {
        this.name = name;
    };
    Bank_draft.prototype.getRouteNum = function () {
        return this.route_number;
    };
    Bank_draft.prototype.setRouteNum = function (num) {
        this.route_number = num;
    };
    Bank_draft.prototype.getAccountNum = function () {
        return this.account_number;
    };
    Bank_draft.prototype.setAccountNum = function (expiration) {
        this.account_number = expiration;
    };
    Bank_draft.prototype.obtain_info = function () {
        console.log('Enter Bank Account Details.');
        this.name = readlineSync.question('  Name: ');
        this.route_number = readlineSync.question('  Bank Routing Number: ');
        this.account_number = readlineSync.question('  Bank Account Number: ');
        var info = [this.name, this.route_number, this.account_number];
        return info;
    };
    Bank_draft.prototype.validate_info = function () {
        var valid = /^[\w.' ]+$/.test(this.name) && /\d{9}/.test(this.route_number) && /\d{6,12}/.test(this.account_number);
        return valid;
    };
    return Bank_draft;
}());
exports.Bank_draft = Bank_draft;
