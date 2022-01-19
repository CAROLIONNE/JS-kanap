const img = document.querySelector(".item__img");
const price = document.getElementById("price");
const description = document.getElementById("description");
const title = document.getElementById("title");
const colorsElt = document.getElementById("colors");

/////////----Recupérer ID dans URL----/////////

let productData = [];
let params = new URL(document.location).searchParams;
let id = params.get("id");
fetch(`http://localhost:3000/api/products/` + id)
  .then((response) => {
    if (response.ok) {
      return response.json();
    }
  })
  .then((data) => {
    productData = data;
  })
  .then(detailProduct)

  .catch((error) => {
    console.log("Une erreur est survenue dans l'api");
  });

///////----Affichage détails produit----////////

let baliseImg = "";

function detailProduct() {
  // crée une option pour chaque couleur 
  productData.colors.forEach((color) => {
    let newOption = document.createElement("option");
    newOption.innerHTML = `${color}`;
    newOption.value = `${color}`;
    let parentNode = document.querySelector("#colors");
    parentNode.appendChild(newOption);
  });
  // Injecter les données de l'api dans le HTML
  baliseImg = `<img src=${productData.imageUrl} alt=${productData.altTxt}/>`;
  title.innerHTML = productData.name;
  img.innerHTML = baliseImg;
  price.innerHTML = productData.price;
  description.innerHTML = productData.description;
  document.title = productData.name;
}

///////----Ajouter produits au localStorage----////////

document.getElementById("addToCart").addEventListener("click", (e) => {
  e.preventDefault();
  let color = document.querySelector("#colors").value;
  let quantity = document.querySelector("input").value;
  let product = {
    id: id,
    name: productData.name,
    quantity: quantity,
    color: color,
    image: baliseImg,
  };
  let productSave = localStorage.getItem("cart");
  let cart = [];
  // Si la couleur est mal renseignée style "erreur"
  if (color == "") {
    colorsElt.setAttribute(
      "style",
      "font-style : italic; border:2px solid #09078c"
    );
    window.alert("Veuillez renseignez la couleur de votre choix");
    colorsElt.focus();
  }
  // si la quantité est inférieure a 1 OU supérieure a 100 style "erreur"
  if (quantity < 1 || quantity > 100) {
    document
      .querySelector("input")
      .setAttribute("style", "font-style : italic; border:2px solid #09078c");
    window.alert("Veuillez renseignez la quantité (min: 1 et max: 100)");
    document.querySelector("input").focus();
  } else {
    // Sinon retire le style "erreur"
    colorsElt.removeAttribute("style");
    document.querySelector("input").removeAttribute("style");
    // si il y a un produit dans le local storage recupérer le panier
    if (productSave != null) {
      cart = JSON.parse(productSave);
    }
    changeQuantity(cart, product);
  }
});

///////---- Modification de la quantité----////////

function changeQuantity(cart, product) {
  // verification du produit selectionné avec son nom et sa couleur
  let foundProduct = cart.find(
    (p) => p.name == product.name && p.color == product.color
  );
  // si le produit existe dans le local storage => la quantité trouvée + la quantité saisie
  if (foundProduct != undefined) {
    let a = parseInt(foundProduct.quantity, 10);
    let b = parseInt(product.quantity, 10);
    foundProduct.quantity = JSON.stringify(a + b);
  } else {
    // sinon envoyer le produit dans le tableau des produits
    cart.push(product);
  }
  // Envoi du tableau dans le local Storage
  saveCart(cart);
}
