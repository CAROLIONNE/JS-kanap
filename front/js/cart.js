const cartItems = document.getElementById("cart__items");
let totalCart = 0;

//Recuperer données dans URL
let params = (new URL(document.location)).searchParams;
let id = params.get('id');

// fonction : récupérer données sur API
async function fetchProduct(id) {
    console.log(id);
    await fetch(`http://localhost:3000/api/products/` + id)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
      })
      .then((data) => {
        productData = data;
        console.log(productData);
      })
      .catch((erreur) => {
        console.log("Une erreur est survenue dans l'api");
      });
  }
  fetchProduct();

  function addCart () {
    if (totalCart > 0){
        totalCart+= id;
    }

  }