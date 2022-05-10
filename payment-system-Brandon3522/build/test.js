"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var paymentSystemExecutor_1 = require("./paymentSystemExecutor");
var creditCard_1 = require("./creditCard");
var paymentSystemExecutor = new paymentSystemExecutor_1.PaymentSystemExecutor(new creditCard_1.Credit_card());
paymentSystemExecutor.execute();
console.log("Test");
