const cartItems = document.getElementById("cart__items");
let productsSaved = localStorage.getItem("cart");
let objProducts = JSON.parse(productsSaved);
let totalQuantity = document.getElementById("totalQuantity");
let totalPrice = document.getElementById("totalPrice");

////////////////// Récuperation des produits localStorage //////////////////
function getCart() {
  if (productsSaved == null) {
    window.alert("votre panier est vide");
  } else {
    return JSON.parse(productsSaved);
  }
}

getCart();
////////////////// Creation du panier //////////////////

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
  }
}

createCart();

////////////////// Prix total des articles du panier //////////////////

function getTotalPrice() {
  let priceCart = 0;
  for (let product of objProducts) {
    priceCart += product.quantity * product.price;
  }
  return priceCart;
}
let total = getTotalPrice(objProducts);
totalPrice.innerHTML = total;

////////////////// Quantité totale des articles du panier //////////////////

function getNumberProduct() {
  let quantityCart = 0;
  for (let product of objProducts) {
    quantityCart += parseInt(product.quantity, 10);
  }
  return quantityCart;
}
let totalQuantityCart = getNumberProduct(objProducts);
totalQuantity.innerHTML = totalQuantityCart;

////////////////// Trouver le bon produit //////////////////

function findProduct(id, color) {
  for (let i of objProducts) {
    console.log("TEST " + i);
    if (i.id === id && i.color === color) return i;
  }
}

////////////////// Modification quantité du panier //////////////////

function changeQuantity(i, quantity) {
  //Get the id and color of selected item
  let id = i.closest(".cart__item").dataset.id;
  let color = i.closest(".cart__item").dataset.color;
  let foundProduct = findProduct(id, color);

  for (let product of objProducts) {
    if (product.id == foundProduct.id && product.color == foundProduct.color) {
      product.quantity = quantity;
    }
  }
  saveCart(objProducts);
  window.location.reload();
}

////////////////// Evenement type change pour changer quantité  //////////////////
let inputQuantity = document.querySelectorAll(".itemQuantity");

for (let input of inputQuantity) {
  input.addEventListener("change", (e) => {
    changeQuantity(input, e.target.value);
  });
}

////////////////// supprimer un produit du panier //////////////////

let deleteProduct = document.querySelectorAll(".deleteItem");

for (let i = 0; i < deleteProduct.length; i++) {
  deleteProduct[i].addEventListener("click", (event) => {
    event.preventDefault();
    objProducts.splice(i, 1);
    saveCart(objProducts);
    location.reload();
  });
}
