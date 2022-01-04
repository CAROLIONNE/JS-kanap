const img = document.querySelector(".item__img")
const price = document.getElementById("price");
const description = document.getElementById("description");
const title = document.getElementById("title");
const colors = document.getElementById("colors");

let productData = [];
let params = (new URL(document.location)).searchParams;
let id = params.get('id'); 
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
    .then((detailProduct))

    .catch((erreur) => {
      console.log("Une erreur est survenue dans l'api");
    });


//Affichage détails produit



 function detailProduct() {
  
  let imgSrc = `<img src=${productData.imageUrl} alt=${productData.altTxt}/>`
  let displayColor = [];
  for (i = 0; i < productData.colors.length; i++ ){
      displayColor += `<option value="${productData.colors[i]}">${productData.colors[i]}</option>`
    }
    
    colors.innerHTML = displayColor;
    title.innerHTML = productData.name;
    img.innerHTML = imgSrc;
    price.innerHTML = productData.price;
    description.innerHTML = productData.description;
    document.title = productData.name;
    
}



//Ajouter produits au panier



/*
// envoyer les données du panier
document.getElementById('addToCart').addEventListener("click", (e) => {
    e.preventDefault();
    storage();
})



let quantity = document.querySelector("input").value;
let color = document.querySelector('#colors option').value;
console.log(color);

//localStorage.name = JSON.stringify(obj);//  chaines de cacratères pour local storage
//JSON.parse(localStorage.name) // transformer en objet JS
// parseInt string en Number

function storage(){
    localStorage.productquantity = quantity;
}*/