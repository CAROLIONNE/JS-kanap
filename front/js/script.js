const sectionItems = document.getElementById("items");
let productsData = [];


// fonction : récupérer données sur API
async function fetchProducts() {
  await fetch(`http://localhost:3000/api/products`)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
    })
    .then((data) => {
      productsData = data;
      console.log(productsData);
    })
    .catch((erreur) => {
      console.log("Une erreur est survenue dans l'api");
    });
}

//fonction créer card pour chaque item
 async function createCards() {
  await fetchProducts()
  for (i =0; i<productsData.length; i++ ){
    sectionItems.innerHTML = productsData
    .map(
      (card) =>
      `
      <a href=${productsData[i].id}>
        <article>
          <img src=${productsData[i].imageUrl} alt=${productsData[i].altTxt}
          />
          <h3 class="productName">${productsData[i].name}</h3>
          <p class="productDescription">${productsData[i].description}
          </p>
        </article>
      </a>
      `
    )
  }
}
createCards()

