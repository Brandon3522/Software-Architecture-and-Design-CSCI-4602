"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RemoveProductView = void 0;
var RemoveProductView = /** @class */ (function () {
    function RemoveProductView(model) {
        this.model = model;
    }
    RemoveProductView.prototype.getView = function (index) {
        var cart = this.model.getShoppingCart();
        var quanity = this.model.getQuanity();
        var view = "";
        view = index + ": " + cart[index].getName();
        return view;
    };
    return RemoveProductView;
}());
exports.RemoveProductView = RemoveProductView;
