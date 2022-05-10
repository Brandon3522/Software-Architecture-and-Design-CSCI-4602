import { ProductModel } from "./productModel";

export class ProductListView{
    private model: ProductModel

    constructor(model: ProductModel){
        this.model = model;
    }

    public getView(index: number): string {
        let cart = this.model.getShoppingCart();
        let quanity = this.model.getQuanity();
        let view = "";
        view = "" + 
            "       Name: " + cart[index].getName()
            + "\n" + "      Price: "+ cart[index].getPrice()
            + "\n" + "Description: "+ cart[index].getDescription()
            + "\n" + "   Quantity: "+ quanity[index] + "\n";

        return view;
    }
}