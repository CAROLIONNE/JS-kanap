const img = document.querySelector(".item__img");
const price = document.getElementById("price");
const description = document.getElementById("description");
const title = document.getElementById("title");
const colorsElt = document.getElementById("colors");

/////////----Fetch requête GET----/////////

let productData = [];
// Récupérer l'ID dans l'URL
let params = new URL(document.location).searchParams;
let id = params.get("id");
fetch(`http://localhost:3000/api/products/` + id)
  .then((response) => {
    if (response.ok) {
      return response.json();
    }
  })
  // Récupérer la data du produit
  .then((data) => {
    productData = data;
    if(!data){
      alert('Produit introuvable');
      }
  })
  // Afficher le produit
  .then(detailProduct)

  .catch((err) => {
    console.log("Une erreur est survenue dans l'api" + err);
  });

////////----Affichage détails produit----////////


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
  title.innerHTML = productData.name;
  img.innerHTML = `<img src=${productData.imageUrl} alt="${productData.altTxt}"/>`;
  price.innerHTML = productData.price;
  description.innerHTML = productData.description;
  document.title = productData.name;
}

////////----Ajouter produits au localStorage----////////

document.getElementById("addToCart").addEventListener("click", (e) => {
  e.preventDefault();
  let color = document.querySelector("#colors").value;
  let quantity = document.querySelector("input").value;
  // Objet produit avec ses details
  let product = {
    id: id,
    name: productData.name,
    quantity: quantity,
    color: color,
  };
  let productSave = localStorage.getItem("cart");
  let cart = [];

  // Si la couleur est mal renseignée => style "erreur"
  if (color == "") {
    colorsElt.setAttribute(
      "style",
      "font-style : italic; border:2px solid #09078c"
    );
    window.alert("Veuillez renseignez la couleur de votre choix");
    colorsElt.focus();
  }
  // Si la quantité est inférieure a 1 OU supérieure a 100 => style "erreur"
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
    // Si il y a un produit dans le local storage recupérer le panier
    if (productSave != null) {
      cart = JSON.parse(productSave);
    }
    changeQuantity(cart, product);
    if (product.quantity == 1){
      alert(product.quantity + " "+ product.name + " couleur : "+ product.color +" a bien été ajouté dans votre panier ")
    }else{
      alert(product.quantity + " "+ product.name + " couleur : "+ product.color + " sont ajoutés dans votre panier ")
    }
  }
});

////////---- Modification de la quantité----////////

function changeQuantity(cart, product) {
  // Vérification du produit selectionné avec son nom et sa couleur
  let foundProduct = cart.find(
    (p) => p.name == product.name && p.color == product.color
  );
  // Si le produit existe dans le local storage => la quantité trouvée + la quantité saisie
  if (foundProduct != undefined) {
    let a = parseInt(foundProduct.quantity, 10);
    let b = parseInt(product.quantity, 10);
    foundProduct.quantity = JSON.stringify(a + b);
  } else {
    // Sinon envoyer le produit dans le tableau des produits
    cart.push(product);
  }
  // Envoi du tableau dans le local Storage
  saveCart(cart);
}
