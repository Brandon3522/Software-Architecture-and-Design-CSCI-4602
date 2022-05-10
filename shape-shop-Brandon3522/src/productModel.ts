import { Product } from "./products";

export class ProductModel{
    //private product: Product;
    private shopping_cart: Product[];
    private quanity: number[];

    constructor(){
        this.shopping_cart = [];
        this.quanity = [];
    }

    public getShoppingCart(): Product[]{
        return this.shopping_cart;
    }

    public setShoppingCart(shopping_cart: Product[]){
        this.shopping_cart = shopping_cart;
    }

    public getQuanity(): number[]{
        return this.quanity;
    }

    public setQuanity(quanity: number[]){
        this.quanity = quanity;
    }

    public addProduct(product: Product): void{
        this.shopping_cart.push(product);
    }

    // remove product based on index of quanity list
    public removeProduct(index: number){
        for (let i = 0; i < this.shopping_cart.length; i++) {
            if (i == index){
                this.shopping_cart.splice(index, 1);
                this.quanity.splice(index, 1);
            }
        }
    }

}