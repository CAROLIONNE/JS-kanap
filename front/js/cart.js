const cartItems = document.getElementById("cart__items");
let productsSaved = localStorage.getItem("cart");
let objProducts = JSON.parse(productsSaved);
let totalCart = objProducts.length;
totalQuantity = document.getElementById("totalQuantity");
totalPrice = document.getElementById("totalPrice");

function getCart() {
  if (productsSaved == null) {
    window.alert("votre panier est vide");
  } else {
    return JSON.parse(productsSaved);
  }
}
getCart();

createCart();

function createCart() {
  for (product of objProducts) {
    console.log(product);
    console.log(objProducts);
    cartItems.innerHTML += `
    <article class="cart__item" data-id=${product.id} data-color="{product-color}">
    <div class="cart__item__img">
    ${product.image}
    </div>
    <div class="cart__item__content">
    <div class="cart__item__content__description">
    <h2>${product.name}</h2>
    <p>${product.color}</p>
    <p>${product.price}</p>
    </div>
    <div class="cart__item__content__settings">
    <div class="cart__item__content__settings__quantity">
    <p>Qté : </p>
    <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value=${product.quantity}>
    </div>
    <div class="cart__item__content__settings__delete">
    <p class="deleteItem">Supprimer</p>
    </div>
    </div>
    </div>
    </article>
    `;
  }
  //suprimer un article
  document.querySelector(".deleteItem").addEventListener("click", () => {
    localStorage.removeItem("cart");
  });
}

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

function getNumberProduct() {
  let cart = getCart();
  let quantityCart = 0;
  for (let product of cart) {
    quantityCart += parseInt(product.quantity, 10);
  }
  return quantityCart;
}
let QTY = getNumberProduct(objProducts);
totalQuantity.innerHTML = QTY;
