/* global Product, Cart */

'use strict';

var counter = 0;
// add item function
function addElement(element, content, parent) {
  var newElement = document.createElement(element);
  var newContent = document.createTextNode(content);
  newElement.appendChild(newContent);
  parent.appendChild(newElement);
  return newElement;
}


// Set up an empty cart for use on this page.
var cart = new Cart([]);

function populateForm() {
  var selectElement = document.getElementById('items');
  addElement('option', 'Add Item', selectElement);
  for (var i in Product.allProducts) {
    addElement('option', Product.allProducts[i].name , selectElement).setAttribute('value', Product.allProducts[i].name);
  }
}

// object, save the whole thing back to local storage and update the screen
// so that it shows the # of items in the cart and a quick preview of the cart itself.
function handleSubmit(event) {
  event.preventDefault();  
  // Do all the things ...
  addSelectedItemToCart();
  cart.saveToLocalStorage();
  updateCounter();
  console.log("finished updateCounter");
  updateCartPreview();
  counter++;
  console.log(counter);

}

//TODO: add the items to the cart page
function addSelectedItemToCart() {
  var selectedProduct = document.getElementById('items').value;
  var getQuantity = document.getElementById('quantity').value;
  var toNum = parseInt(getQuantity);

  cart.addItem(selectedProduct, toNum);

  console.log(toNum);
  console.log(selectedProduct.value);
  console.log(cart);
  console.log(selectedProduct,toNum);
  }

function updateCounter() {
  for(var i = 0; i<cart.items.length; i++){
  var cartNav = document.getElementById("itemCount").innerHTML = ": " + cart.items[i].quantity;
  }
}
// TODO: As you add items into the cart, show them (item & quantity) in the cart preview div
function updateCartPreview() {
  console.log("function: updateCart");
  var div= document.getElementById('cartContents');
  addElement('p', "Items in cart: " + cart.items[counter].product + "(" + cart.items[counter].quantity +")" , div);
  
  
}

// This is the trigger for the app. When a user "submits" the form, it will
// Call that handleSubmit method above and kick off the whole process
var catalogForm = document.getElementById('catalog');
catalogForm.addEventListener('submit', handleSubmit);


populateForm();