function saveCart(cart) {

  localStorage.setItem("cart", JSON.stringify(cart));
  console.log("creation localStorage");
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
//fetch requette GET pour recupérer les produits sur l'API
fetch("http://localhost:3000/api/products")
  .then((response) => {
    if (response.ok) {
      return response.json();
    }
  })
  .then((productsData) => {
    console.log(productsData);
  })
  .catch((erreur) => {
    console.log("Une erreur est survenue dans l'api");
  });
