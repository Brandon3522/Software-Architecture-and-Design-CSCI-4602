"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
var Product = /** @class */ (function () {
    function Product(name, price, description) {
        this.name = name;
        this.price = price;
        this.description = description;
    }
    Product.prototype.getName = function () { return this.name; };
    Product.prototype.getPrice = function () { return this.price; };
    Product.prototype.getDescription = function () { return this.description; };
    return Product;
}());
exports.Product = Product;
