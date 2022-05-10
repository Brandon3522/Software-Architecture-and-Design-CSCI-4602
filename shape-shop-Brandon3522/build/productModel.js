"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductModel = void 0;
var ProductModel = /** @class */ (function () {
    function ProductModel() {
        this.shopping_cart = [];
        this.quanity = [];
    }
    ProductModel.prototype.getShoppingCart = function () {
        return this.shopping_cart;
    };
    ProductModel.prototype.setShoppingCart = function (shopping_cart) {
        this.shopping_cart = shopping_cart;
    };
    ProductModel.prototype.getQuanity = function () {
        return this.quanity;
    };
    ProductModel.prototype.setQuanity = function (quanity) {
        this.quanity = quanity;
    };
    ProductModel.prototype.addProduct = function (product) {
        this.shopping_cart.push(product);
    };
    // remove product based on index of quanity list
    ProductModel.prototype.removeProduct = function (index) {
        for (var i = 0; i < this.shopping_cart.length; i++) {
            if (i == index) {
                this.shopping_cart.splice(index, 1);
                this.quanity.splice(index, 1);
            }
        }
    };
    return ProductModel;
}());
exports.ProductModel = ProductModel;
