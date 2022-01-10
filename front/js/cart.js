const cartItems = document.getElementById("cart__items");
let totalCart = 0;
let productsSaved = localStorage.getItem("cart");

fetch("http://localhost:3000/api/products")
  .then((response) => {
    if (response.ok) {
      return response.json();
    }
  })
  .then((productsData) => {
    console.log(productsData);

    for (product of JSON.parse(productsSaved)) {
      console.log(product);
      cartItems.innerHTML += `
  <article class="cart__item" data-id=${product.name} dat/a-color="{product-color}">
    <div class="cart__item__img">
      <img src="../images/product01.jpg" alt="Photographie d'un canapé">
    </div>
    <div class="cart__item__content">
      <div class="cart__item__content__description">
        <h2>Nom du produit</h2>
        <p>Vert</p>
        <p>42,00 €</p>
      </div>
      <div class="cart__item__content__settings">
        <div class="cart__item__content__settings__quantity">
          <p>Qté : </p>
          <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="42">
        </div>
        <div class="cart__item__content__settings__delete">
          <p class="deleteItem">Supprimer</p>
        </div>
      </div>
    </div>
  </article>
`;}
    })
  .catch((erreur) => {
    console.log("Une erreur est survenue dans l'api");
  });

function getCart() {

  if (productsSaved == null) {
    window.alert("votre panier est vide");
  } else {
    return JSON.parse(productsSaved);
  }
}
getCart();




/*
let foundProduct = JSON.parse(productsSaved).find(
  (p) => p.name == ${product._id})

if (foundProduct) {

}else{

}
*/
