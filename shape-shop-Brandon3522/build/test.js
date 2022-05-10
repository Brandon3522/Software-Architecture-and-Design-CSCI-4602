"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var productModel_1 = require("./productModel");
var productListView_1 = require("./productListView");
var products_1 = require("./products");
var priceView_1 = require("./priceView");
var removeProductView_1 = require("./removeProductView");
var model = new productModel_1.ProductModel();
var product_list_view = new productListView_1.ProductListView(model);
model.addProduct(new products_1.Product("Triangle", 3.5, "It's got three sides!"));
model.addProduct(new products_1.Product("Square", 4.5, "It's got four sides!"));
var quanity = model.getQuanity();
quanity[0] = 2;
quanity[1] = 1;
console.log('loop');
for (var i = 0; i < model.getShoppingCart().length; i++) {
    console.log(product_list_view.getView(i));
}
console.log("");
var price_view = new priceView_1.PriceView(model);
console.log(price_view.getView());
console.log("");
var remove_product_view = new removeProductView_1.RemoveProductView(model);
for (var i = 0; i < model.getShoppingCart().length; i++) {
    console.log(remove_product_view.getView(i));
}
console.log("");
// model.removeProduct(0);
// console.log(product_list_view.getView());
