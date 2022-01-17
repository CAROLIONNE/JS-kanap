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

  .catch((erreur) => {
    console.log("Une erreur est survenue dans l'api");
  });

///////----Affichage détails produit----////////
let baliseImg = "";

function detailProduct() {
  productData.colors.forEach((color) => {
    let newOption = document.createElement("option");
    newOption.innerHTML = `${color}`;
    newOption.value = `${color}`;

    let parentNode = document.querySelector("#colors");
    parentNode.appendChild(newOption);
  });

  baliseImg = `<img src=${productData.imageUrl} alt=${productData.altTxt}/>`;
  title.innerHTML = productData.name;
  img.innerHTML = baliseImg;
  price.innerHTML = productData.price;
  description.innerHTML = productData.description;
  document.title = productData.name;
}

//Ajouter produits au localStorage

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
  if (color == "") {
    colorsElt.setAttribute(
      "style",
      "font-style : italic; border:1px solid red"
    );
    window.alert("Veuillez renseignez la couleur de votre choix");
    colorsElt.focus();
  }
  if (quantity == 0) {
    document
      .querySelector("input")
      .setAttribute("style", "font-style : italic; border:2px solid red");
    window.alert("Veuillez renseignez la quantité");
    document.querySelector("input").focus();
  } else {
    colorsElt.removeAttribute("style");
    document.querySelector("input").removeAttribute("style");
    if (productSave != null) {
      //cart = JSON.parse(localStorage.getItem("cart"));
      cart = JSON.parse(productSave);
    }
    changeQuantity(cart, product);
    console.log(cart);
  }
});

function changeQuantity(cart, product) {
  let foundProduct = cart.find(
    (p) => p.name == product.name && p.color == product.color
  );
  if (foundProduct != undefined) {
    let a = parseInt(foundProduct.quantity, 10);
    let b = parseInt(product.quantity, 10);
    foundProduct.quantity = JSON.stringify(a + b);
  } else {
    cart.push(product);
  }
  saveCart(cart);
}
