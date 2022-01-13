const cartItems = document.getElementById("cart__items");
let cartItem;
let inputQuantity;
let deleteItem;
let productsSaved = localStorage.getItem("cart");
let objProducts = JSON.parse(productsSaved);
let totalQuantity = document.getElementById("totalQuantity");
let totalPrice = document.getElementById("totalPrice");
let btnDelete = document.querySelectorAll("p .deleteItem");

function getCart() {
  if (productsSaved == null) {
    window.alert("votre panier est vide");
  } else {
    return JSON.parse(productsSaved);
  }
}
getCart();

function createCart() {
  for (product of objProducts) {
    console.log(product);
    console.log(objProducts);
    cartItems.innerHTML += `
    <article class="cart__item" data-id=${product.id} data-color=${product.color}>
    <div class="cart__item__img">
    ${product.image}
    </div>
    <div class="cart__item__content">
    <div class="cart__item__content__description">
    <h2>${product.name}</h2>
    <p>Couleur selectionnée : ${product.color}</p>
    <p>Prix unitaire : ${product.price}</p>
    </div>
    <div class="cart__item__content__settings">
    <div class="cart__item__content__settings__quantity">
    <p>Qté : </p>
    <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value=${product.quantity}>
    </div>
    <div class="cart__item__content__settings__delete">
    <br>
    <p class="deleteItem">Supprimer</p>
    </div>
    </div>
    </div>
    </article>
    `;
    cartItem = document.querySelectorAll(".cart__item");
    deleteItem = document.querySelectorAll("p.deleteItem");
    inputQuantity = document.querySelectorAll(".itemQuantity");
  }
}

/*
  for (i = 0; i < objProducts.length; i++) {
    let index = objProducts.indexOf(`${product.id}`);
    console.log(index);
  }
  */

//suprimer un article training dev
/*
function removeCart() {
  let cart = getCart();
  cart = cart.filter((p) => p.id != product.id);
  saveCart(cart);
}
*/

// Prix total des articles du panier
function getTotalPrice() {
  let cart = getCart();
  let priceCart = 0;
  for (let product of cart) {
    priceCart += product.quantity * product.price;
  }
  return priceCart;
}
let total = getTotalPrice(objProducts);
totalPrice.innerHTML = total;

// Quantité totale des articles du panier
let quantityCart = 0;
function getNumberProduct() {
  let cart = getCart();
  for (let product of cart) {
    quantityCart += parseInt(product.quantity, 10);
  }
  return quantityCart;
}
let totalQuantityCart = getNumberProduct(objProducts);
totalQuantity.innerHTML = totalQuantityCart;

////////////////// modification quantité du panier //////////////

/*
for (product of cartItem) {
  let color = product.dataset.color;
  let id = product.dataset.id;
}
*/

let color, id, colorObj, idObj;

async function updateCart() {
  await createCart();
  cartItem.forEach((element) => {
    color = element.dataset.color;
    id = element.dataset.id;
  });
  objProducts.forEach((element) => {
    colorObj = element.color;
    idObj = element.id;
  });
}

updateCart();

for (input of inputQuantity) {
  console.log(input);
  if (color == colorObj && id == idObj) {
    input.addEventListener("change", () => {
      console.log("evenement modif quantité");
      changeQuantity();
    });
  }
}

//////////////////////
function findProduct(id, color) {
  let foundProduct = objProducts.find(
    (p) => p.id == product.id && p.color == product.color
  );
  console.log(foundProduct);
  if (foundProduct != undefined) {
    return foundProduct;
  } else {
    console.log("no product found");
    return null;
  }
}

function changeQuantity(product, quantity) {
  let cart = getCart();
  //let foundProduct = cart.findProduct(product.id, product.option_produit);
  let foundProduct = findProduct(id, color);
  //let foundProduct = cart.findProduct(cart.id, cart.color);
  console.log(foundProduct);
  if (foundProduct != undefined) {
    foundProduct.quantity = parseInt(quantity);
    if (foundProduct.quantity < 1) {
      localStorage.removeItem(foundProduct);
      //cart.remove(foundProduct);
    } else {
      saveCart();
    }
  }
  //window.location.reload();
}
