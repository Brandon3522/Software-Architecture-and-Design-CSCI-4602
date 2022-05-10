"use strict";
//User Interface for The Shopping Cart 
//@author James Church
Object.defineProperty(exports, "__esModule", { value: true });
exports.start = void 0;
var readlineSync = require("readline-sync"); //for easier repeated prompts
var priceView_1 = require("./priceView");
var productListView_1 = require("./productListView");
var productModel_1 = require("./productModel");
var products_1 = require("./products");
var removeProductView_1 = require("./removeProductView");
var model = new productModel_1.ProductModel();
var price_view = new priceView_1.PriceView(model);
var product_list_view = new productListView_1.ProductListView(model);
var remove_product_view = new removeProductView_1.RemoveProductView(model);
/**
 * Function to run the UI
 */
function start() {
    showMainMenu();
}
exports.start = start;
/**
 * The main menu. Will show until the user exits
 */
function showMainMenu() {
    while (true) { //run until we exit
        console.log("Welcome to the Shape Store! We offer the best shapes! Pick an option:\n  1. Add an item to the cart.\n  2. Remove an item to the cart.\n  3. View the items in the cart.\n  4. View the price of all items.\n  5. Quit.");
        var response = readlineSync.question('> ');
        if (response === '5' || response.slice(0, 2).toLowerCase() === ':q') {
            break; //stop looping, thus leaving method
        }
        switch (response) { //handle each response
            case '1':
                addItemToCart();
                break;
            case '2':
                removeItemFromCart();
                break;
            case '3':
                viewItemsInCart();
                break;
            case '4':
                viewCartTotal();
                break;
            default: console.log('Invalid option!');
        }
        console.log(''); //extra empty line for revisiting
    }
}
function addItemToCart() {
    letUserSelectItem();
    letUserSelectQuantity();
}
function letUserSelectItem() {
    console.log("Here you can select your shape. Pick an option:\n  1. Buy a Triangle!\n  2. Buy a Square!\n  3. Buy a Pentagon!\n  4. Go back. Don't buy anything.");
    var response = readlineSync.question('> ');
    switch (response) { //handle each response
        case '1':
            model.addProduct(new products_1.Product("Triangle", 3.5, "It's got three sides!"));
            break;
        case '2':
            model.addProduct(new products_1.Product("Square", 4.5, "It's got four sides!"));
            break;
        case '3':
            model.addProduct(new products_1.Product("Pentagon", 5.5, "It's got five sides!"));
            break;
        default: console.log('Invalid option!');
    }
    console.log(''); //extra empty line for revisiting
}
function letUserSelectQuantity() {
    console.log("How many of this shape would you like to purchase?\n  ");
    var quanity = model.getQuanity();
    var response = readlineSync.question('> ');
    quanity.push(parseInt(response));
    console.log(''); //extra empty line for revisiting
}
function removeItemFromCart() {
    console.log("Select an item to be removed from the cart.\n  ");
    var cart = model.getShoppingCart();
    for (var i = 0; i < cart.length; i++) {
        console.log(remove_product_view.getView(i));
    }
    var response = readlineSync.question('> ');
    var toRemove = parseInt(response);
    model.removeProduct(toRemove);
    console.log(''); //extra empty line for revisiting
}
function viewItemsInCart() {
    var cart = model.getShoppingCart();
    for (var i = 0; i < cart.length; i++) {
        console.log(product_list_view.getView(i));
    }
}
function viewCartTotal() {
    console.log(price_view.getView());
}
