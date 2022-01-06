const img = document.querySelector(".item__img");
const price = document.getElementById("price");
const description = document.getElementById("description");
const title = document.getElementById("title");
const colorsElt = document.getElementById("colors");
let productData = [];

/////////----Recupérer ID dans URL----/////////

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
    console.log(productData);
  })
  .then(detailProduct)

  .catch((erreur) => {
    console.log("Une erreur est survenue dans l'api");
  });

///////----Affichage détails produit----////////

function detailProduct() {
  
  /* test boucle couleur
  let displayColor = [];
  for (i = 0; i < productData.colors.length; i++) {
    displayColor += `<option value="${productData.colors[i]}">${productData.colors[i]}</option>`;
  }
  colorsElt.innerHTML = displayColor;
  */
  productData.colors.forEach((color) => {
    let newOption = document.createElement("option");
    newOption.innerHTML = `${color}`;
    newOption.value = `${color}`;

    let parentNode = document.querySelector("#colors");
    parentNode.appendChild(newOption);
  })

  title.innerHTML = productData.name;
  img.innerHTML = `<img src=${productData.imageUrl} alt=${productData.altTxt}/>`;
  price.innerHTML = productData.price;
  description.innerHTML = productData.description;
  document.title = productData.name;
}

//Ajouter produits au panier

// envoyer les données du panier
document.getElementById("addToCart").addEventListener("click", (e) => {
  e.preventDefault();
  //storage();
});

function colorValue (){
  
  let color= document.querySelector("option").parentNode.value;
  let color2 = colorsElt.value;
  let color3 = [];
  for (i = 0; i < colorsElt.length; i++){
    if (colorsElt[i].selected){
      color3.push(colorsElt[i].value)
    }
  }
  console.log(color);
  console.log(color2);
  console.log(color3);
  
}

colorValue()

let quantity = document.querySelector("input").value;
//let productsCart = [id, quantity,color];

//console.log(productsCart);

//localStorage.name = JSON.stringify(obj);//  chaines de cacratères pour local storage
//JSON.parse(localStorage.name) // transformer en objet JS
// parseInt string en Number

/*
function storage() {
  localStorage.cart = productsCart;
}

storage();


if (localStorage.quantity === undefined){
    localStorage.productquantity = quantity
}
else (localStorage.quantity !== undefined)
localStorage.removeItem(quantity);
localStorage.productquantity = quantity*/
