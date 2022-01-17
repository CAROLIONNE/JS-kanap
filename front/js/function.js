////////////////// Initialisation du panier localStorage //////////////////

function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

////////////////// Récuperation des produits localStorage //////////////////

function getCart() {
  if (productsSaved == null) {
    window.alert("votre panier est vide");
  } else {
    return JSON.parse(productsSaved);
  }
}
