"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductListView = void 0;
var ProductListView = /** @class */ (function () {
    function ProductListView(model) {
        this.model = model;
    }
    ProductListView.prototype.getView = function (index) {
        var cart = this.model.getShoppingCart();
        var quanity = this.model.getQuanity();
        var view = "";
        view = "" +
            "       Name: " + cart[index].getName()
            + "\n" + "      Price: " + cart[index].getPrice()
            + "\n" + "Description: " + cart[index].getDescription()
            + "\n" + "   Quantity: " + quanity[index] + "\n";
        return view;
    };
    return ProductListView;
}());
exports.ProductListView = ProductListView;
