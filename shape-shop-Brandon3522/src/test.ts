import { ProductModel } from "./productModel";
import { ProductListView } from "./productListView";
import { Product } from "./products";
import { PriceView } from "./priceView"
import { RemoveProductView } from "./removeProductView"

let model = new ProductModel();
let product_list_view = new ProductListView(model);


model.addProduct(new Product("Triangle", 3.5, "It's got three sides!"));
model.addProduct(new Product("Square", 4.5, "It's got four sides!"));
let quanity = model.getQuanity();
quanity[0] = 2;
quanity[1] = 1;

console.log('loop');
for (let i = 0; i < model.getShoppingCart().length; i++) {
    console.log(product_list_view.getView(i));
    
}

console.log("");

let price_view = new PriceView(model);

console.log(price_view.getView());

console.log("");

let remove_product_view = new RemoveProductView(model);


for (let i = 0; i < model.getShoppingCart().length; i++) {
    console.log(remove_product_view.getView(i));
    
}


console.log("");

// model.removeProduct(0);



// console.log(product_list_view.getView());
