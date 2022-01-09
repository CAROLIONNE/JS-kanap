function saveCart(cart) {

  localStorage.setItem("cart", JSON.stringify(cart));
  console.log("creation localStorage");
}

function getCart() {
  let cart = localStorage.getItem("cart");
  if (cart == null) {
    return [];
  } else {
    return JSON.parse(cart);
  }
}

function addCart(product) {
  let cart = getCart();
  let foundProduct = cart.find((p) => p.id == product.id);
  
  if (foundProduct != undefined) {
    foundProduct.quantity++;
  } else {
    product.quantity = 1;
    cart.push(product);
  }
  saveCart(cart);
}

function removeCart(product) {
  let cart = getCart();
  cart = cart.filter((p) => p.name != product.name);
  saveCart(cart);
}

function changey(product, quantity) {
  let cart = getCart();
  let foundProduct = cart.find((p) => p.name == product.name);
  if (foundProduct != undefined) {
    foundProduct.quantity += quantity;
    if (foundProduct.quantity <= 0) {
      removeCart(foundProduct);
    } else {
      saveCart(cart);
    }
  }
}
function getNumberProduct() {
  let cart = getCart();
  let number = 0;
  for (let product of cart) {
    number += product.quantity;
  }
  return number;
}

function getTotalPrice() {
  let cart = getCart();
  let number = 0;
  for (let product of cart) {
    number += product.quantity * product.price;
  }
  return number;
}
/////////////////////////////////////////-------------------------------------------
function addStorage() {
 let color = document.querySelector("option").parentNode.value;
  let quantity = document.querySelector("input").value;
  let product = {
    name: id,
    quantity: quantity,
    color: color
  }
  
  localStorage.setItem("cart", JSON.stringify(product));
  console.log("creation localStorage");
}
