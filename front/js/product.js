let productData = [];
const img = document.querySelector(".item__img")
const price = document.getElementById("price");
const description = document.getElementById("description");
const title = document.getElementById("title");
const colors = document.getElementById("colors");

//Recuperer données dans URL
function $_GET(param) {
  var vars = {};
  window.location.href.replace(location.hash, "").replace(
    /[?&]+([^=&]+)=?([^&]*)?/gi, // regexp
    function (m, key, value) {
      // callback
      vars[key] = value !== undefined ? value : "";
    }
  );
  if (param) {
    return vars[param] ? vars[param] : null;
  }
  return vars;
}

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

//Affichage détails produit
async function detailProduct() {
  await fetchProduct($_GET("id"));
  let displayColor = "";
  let imgsrc = `<img src=${productData.imageUrl} alt=${productData.altTxt}/>`
  for (i =0; i < productData.colors.length; i++ ){
      displayColor += `<option value="${productData.colors[i]}">${productData.colors[i]}</option>`
    }
    colors.innerHTML = displayColor;
    title.innerHTML = productData.name;
    img.innerHTML = imgsrc;
    price.innerHTML = productData.price;
    description.innerHTML = productData.description;
    document.title = productData.name;
}

detailProduct();
