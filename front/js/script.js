const sectionItems = document.getElementById("items");

// fonction : récupérer données sur API
fetch("http://localhost:3000/api/products")
  .then((response) => {
    if (response.ok) {
      return response.json();
    }
  })
  .then((productsData) => {
    console.log(productsData);
    for (data of productsData) {
      sectionItems.innerHTML += `
        <a href="./product.html?id=${data._id}">
        <article>
        <img src="${data.imageUrl}" alt="${data.altTxt}"
        />
        <h3 class="productName">${data.name}</h3>
        <p class="productDescription">${data.description}
        </p>
        </article>
        </a>
        `;
    }
  })
  .catch((erreur) => {
    console.log("Une erreur est survenue dans l'api");
  });

  