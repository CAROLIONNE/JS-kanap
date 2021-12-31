const sectionItems = document.getElementById("items");
let donnees;
let products = [];
let imgProducts = document.createElement('img');
let imgSrc;
const imgHTML = document.querySelector('#items img');

// fonction : récupérer données sur l'API //
function fetchProducts() {
  fetch(`http://localhost:3000/api/products`)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
    })

    .then((data) => {
      console.log(data[0]);
      //sectionItems.textContent = data[0];
    })
    .catch((erreur) => {
      console.log("Une erreur est survenue dans l'api");
    });
}

console.log();





/*
function displayProducts(){
    sectionItems.innerHTML = products
    .map (product) => {
        let descrProduct = [];
        
        for (i=0; i<7; i++) {
            let colors = product[`data${i}`]
        }
    }
}
*/
