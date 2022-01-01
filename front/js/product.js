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
  fetchProducts()