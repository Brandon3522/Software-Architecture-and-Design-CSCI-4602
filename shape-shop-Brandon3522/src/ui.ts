//User Interface for The Shopping Cart 
//@author James Church

import readlineSync = require('readline-sync'); //for easier repeated prompts
import {Product} from './products';

// Hey look. It's a global variable. This is totally cool, right?
let shopping_cart: Product[] = [];
let quantity_cart: number[] = [];

/**
 * Function to run the UI
 */
export function start() {
  showMainMenu();
}

/**
 * The main menu. Will show until the user exits
 */
function showMainMenu() {
  while(true){ //run until we exit
    console.log(`Welcome to the Shape Store! We offer the best shapes! Pick an option:
  1. Add an item to the cart.
  2. Remove an item to the cart.
  3. View the items in the cart.
  4. View the price of all items.
  5. Quit.`);

    let response = readlineSync.question('> ')
    if(response === '5' || response.slice(0,2).toLowerCase() === ':q'){
      break; //stop looping, thus leaving method
    }

    switch(response) { //handle each response
      case '1': addItemToCart(); break;
      case '2': removeItemFromCart(); break;
      case '3': viewItemsInCart(); break;
      case '4': viewCartTotal(); break;
      default: console.log('Invalid option!');
    }
    console.log(''); //extra empty line for revisiting
  }
}

function addItemToCart() {
    letUserSelectItem();
    letUserSelectQuantity();
}

function letUserSelectItem() {
    console.log(`Here you can select your shape. Pick an option:
  1. Buy a Triangle!
  2. Buy a Square!
  3. Buy a Pentagon!
  4. Go back. Don't buy anything.`);

    let response = readlineSync.question('> ')

    switch(response) { //handle each response
      case '1': shopping_cart.push(new Product("Triangle", 3.5, "It's got three sides!")); break;
      case '2': shopping_cart.push(new Product("Square", 4.5, "It's got four sides!")); break;
      case '3': shopping_cart.push(new Product("Pentagon", 5.5, "It's got five sides!")); break;
      default: console.log('Invalid option!');
    }
    console.log(''); //extra empty line for revisiting
}

function letUserSelectQuantity() {
    console.log(`How many of this shape would you like to purchase?
  `);

    let response = readlineSync.question('> ')
    quantity_cart.push(parseInt(response));
    console.log(''); //extra empty line for revisiting
}

function removeItemFromCart() {
    console.log(`Select an item to be removed from the cart.
  `);

    for (let i = 0; i < shopping_cart.length; i++) {
        console.log(i+": "+shopping_cart[i].getName());
    }

    let response = readlineSync.question('> ')
    let toRemove = parseInt(response);

    shopping_cart.splice(toRemove, 1);
    quantity_cart.splice(toRemove, 1);

    console.log(''); //extra empty line for revisiting
}

function viewItemsInCart() {
    for (let i = 0; i < shopping_cart.length; i++) {
        console.log("");
        console.log("       Name: "+shopping_cart[i].getName());
        console.log("      Price: "+shopping_cart[i].getPrice());
        console.log("Description: "+shopping_cart[i].getDescription());
        console.log("   Quantity: "+quantity_cart[i]);
    }
}

function viewCartTotal() {
    let total: number = 0;
    for (let i = 0; i < shopping_cart.length; i++) {
        total += shopping_cart[i].getPrice() * quantity_cart[i];
    }
    console.log("Shopping Cart Total: "+total);
}
