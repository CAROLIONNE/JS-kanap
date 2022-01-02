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
  

  function formatCard(tableau, indice) {
    return `
    <a href="./product.html?id=${tableau[indice]._id}">
    <article>
    <img src="${tableau[indice].imageUrl}" alt="${tableau[indice].altTxt}"
    />
    <h3 class="productName">${tableau[indice].name}</h3>
    <p class="productDescription">${tableau[indice].description}
    </p>
    </article>
    </a>
    `;
  }

  //fonction créer card pour chaque item
async function createCards() {
  await fetchProducts();
  let display = "";
  for (i =0; i < productsData.length; i++ ){
    display += formatCard(productsData,i)
  }
  sectionItems.innerHTML = display
}
createCards();

