import { ProductModel } from "./productModel";

export class RemoveProductView{
    private model: ProductModel;

    constructor(model: ProductModel){
        this.model = model;
    }

    public getView(index: number): string{
        let cart = this.model.getShoppingCart();
        let quanity = this.model.getQuanity();
        let view = "";
        view = index + ": " + cart[index].getName();

        return view;
    }
}