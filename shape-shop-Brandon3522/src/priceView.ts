import { ProductModel } from "./productModel";

export class PriceView{
    private model: ProductModel;

    constructor(model: ProductModel){
        this.model = model;
    }

    public getView(): string{
        let total: number = 0;
        let cart = this.model.getShoppingCart();
        let quantity = this.model.getQuanity();
    for (let i = 0; i < cart.length; i++) {
        total += cart[i].getPrice() * quantity[i];
    }

        return "Shopping cart total: " + total.toString();
    }
}