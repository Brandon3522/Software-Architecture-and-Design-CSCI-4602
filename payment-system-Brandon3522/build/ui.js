"use strict";
//User Interface for The Payment System
//@author James Church
Object.defineProperty(exports, "__esModule", { value: true });
exports.start = void 0;
var readlineSync = require("readline-sync"); //for easier repeated prompts
var payment_systems_1 = require("./payment_systems");
var strategyFunction_1 = require("./strategyFunction");
/**
 * Function to run the UI
 */
function start() {
    showMainMenu(new payment_systems_1.PaymentSystemContext());
}
exports.start = start;
/**
 * The main menu. Will show until the user exits
 */
function showMainMenu(psc) {
    while (true) { //run until we exit
        console.log("Welcome to the Payment System! You wish to purchase an item for $5. Pick an option:\n  1. Use a credit card.\n  2. Use a bank draft.\n  3. Use an online payment system.\n  4. Use an offline payment system.\n  5. Quit.");
        var response = readlineSync.question('> ');
        if (response === '5' || response.slice(0, 2).toLowerCase() === ':q') {
            break; //stop looping, thus leaving method
        }
        switch (response) { //handle each response
            case '1':
                strategyFunction_1.payment_selection.payment_selection("credit card");
                break;
            case '2':
                strategyFunction_1.payment_selection.payment_selection("bank draft");
                break;
            case '3':
                strategyFunction_1.payment_selection.payment_selection("online");
                break;
            case '4':
                strategyFunction_1.payment_selection.payment_selection("offline");
                break;
            default: console.log('Invalid option!');
        }
        console.log(''); //extra empty line for revisiting
    }
}
function showCreditCardPaymentMenu(psc) {
    console.log('Enter Credit Card Payment Details.');
    var name = readlineSync.question('  Name: ');
    var creditCardNumber = readlineSync.question('  Credit Card Number: ');
    var creditCardExpirationDate = readlineSync.question('  Credit Card Expiration Date (MM/DD): ');
    var valid = /^[\w.' ]+$/.test(name) && /\d{15,16}/.test(creditCardNumber) && /\d\d\/\d\d/.test(creditCardExpirationDate);
    if (valid) {
        console.log("Your payment information is being encrypted.");
        console.log("The payment is being processed.");
    }
    else {
        console.log('The payment is invalid.');
    }
}
function showBankDraftPaymentMenu(psc) {
    console.log('Enter Bank Account Details.');
    var name = readlineSync.question('  Name: ');
    var bankRoutingNumber = readlineSync.question('  Bank Routing Number: ');
    var bankAccountNumber = readlineSync.question('  Bank Account Number: ');
    var valid = /^[\w.' ]+$/.test(name) && /\d{9}/.test(bankRoutingNumber) && /\d{6,12}/.test(bankAccountNumber);
    if (valid) {
        console.log("Your payment information is being encrypted.");
        console.log("The payment is being processed.");
    }
    else {
        console.log('The payment is invalid.');
    }
}
function showOnlinePaymentMenu(psc) {
    console.log('Enter Online Payment Details.');
    var email = readlineSync.question('  Enter Your Email Address: ');
    var paymentPassword = readlineSync.question('  Enter Your Payment Password: ');
    var valid = /^[\w@.]+$/.test(email) && /\w+/.test(paymentPassword);
    if (valid) {
        console.log("Your payment information is being encrypted.");
        console.log("The payment is being processed.");
    }
    else {
        console.log('The payment is invalid.');
    }
}
function showOfflinePaymentMenu(psc) {
    console.log('Enter Offline Payment Details.');
    var name = readlineSync.question('  Name: ');
    var billingAddress = readlineSync.question('  Enter Your Billing Address: ');
    var valid = /^[\w.' ]+$/.test(name) && /^[\w.' ]+$/.test(billingAddress);
    if (valid) {
        console.log("Your payment information is being encrypted.");
        console.log("The payment is being processed.");
    }
    else {
        console.log('The payment is invalid.');
    }
}
