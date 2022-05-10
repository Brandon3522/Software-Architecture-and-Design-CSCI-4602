"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PriceView = void 0;
var PriceView = /** @class */ (function () {
    function PriceView(model) {
        this.model = model;
    }
    PriceView.prototype.getView = function () {
        var total = 0;
        var cart = this.model.getShoppingCart();
        var quantity = this.model.getQuanity();
        for (var i = 0; i < cart.length; i++) {
            total += cart[i].getPrice() * quantity[i];
        }
        return "Shopping cart total: " + total.toString();
    };
    return PriceView;
}());
exports.PriceView = PriceView;
