////////////////// Initialisation du panier localStorage //////////////////

function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

////////////////// Récuperation des produits localStorage //////////////////

function getCart() {
  if (productsSaved == null) {
    const cartItems = document.getElementById("cart__items");
    cartItems.innerText = "Votre panier est vide"
    cartItems.style.textAlign = "center"
    cartItems.style.marginBottom = "30px"
  } else {
    return JSON.parse(productsSaved);
  }
}
