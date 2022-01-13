const cartItems = document.getElementById("cart__items");
let inputQuantity;
let btnDelete;
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
    btnDelete = document.querySelectorAll("p.deleteItem");
    inputQuantity = document.querySelectorAll(".itemQuantity");
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

  for (let i of objProducts) {
    if (i.id == foundProduct.id && i.color == foundProduct.color) {
      i.quantity = quantity;
    }
  }
  saveCart(objProducts);
  location.reload();
}
////////////////// Evenement type change pour changer quantité  //////////////////

for (let input of inputQuantity) {
  input.addEventListener("change", (e) => {
    changeQuantity(input, e.target.value);
  });
}

////////////////// supprimer du panier //////////////////

function DeleteProduct(i) {
  //Get the id and color of selected item
  let id = i.closest(".cart__item").dataset.id;
  let color = i.closest(".cart__item").dataset.color;
  let foundProduct = findProduct(id, color);

  for (let i of objProducts) {
    if (i.id == foundProduct.id && i.color == foundProduct.color) {
      //i.quantity = 0;
      localStorage.removeItem("cart");
    }
  }
  saveCart(objProducts);
  location.reload();
}

for (let input of btnDelete) {
  input.addEventListener("click", (e) => {
    console.log("event suppr");
    DeleteProduct(e);
    //DeleteProduct(objProducts);
  });
}
