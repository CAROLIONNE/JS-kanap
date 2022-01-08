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
  productData.colors.forEach((color) => {
    let newOption = document.createElement("option");
    newOption.innerHTML = `${color}`;
    newOption.value = `${color}`;

    let parentNode = document.querySelector("#colors");
    parentNode.appendChild(newOption);
  });

  title.innerHTML = productData.name;
  img.innerHTML = `<img src=${productData.imageUrl} alt=${productData.altTxt}/>`;
  price.innerHTML = productData.price;
  description.innerHTML = productData.description;
  document.title = productData.name;
}


//Ajouter produits au panier
document.getElementById("addToCart").addEventListener("click", (e) => {
  e.preventDefault();
  addCart()
})
// envoyer les données du panier

/*
document.getElementById("addToCart").addEventListener("click", (e) => {
  e.preventDefault();
  let productSave = JSON.parse(localStorage.getItem("cart"))

  //si il y a quelque chose dans le panier ajouter nouveau produit
  //sinon créer la clef produit 

  console.log(productArray);
  console.log(productSave);
  
  let productArray = [] ;
  if (localStorage.getItem("cart") == null){
    
    addStorage();
    productSaved = localStorage.getItem("cart");
    productArray.push(productSaved);
    console.log("if");
    
  }else{
    
    addStorage();
    localStorage.getItem("cart");
    productArray.push((localStorage.getItem("cart")));
    console.log("else");
  }

});
*/

/*
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

colorValue()*/

//console.log(productsCart);

//localStorage.name = JSON.stringify(obj);//  chaines de cacratères pour local storage
//JSON.parse(localStorage.name) // transformer en objet JS
// parseInt string en Number
