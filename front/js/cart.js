const cartItems = document.getElementById("cart__items");
let productsSaved = localStorage.getItem("cart");
let objProducts = JSON.parse(productsSaved);
let totalQuantity = document.getElementById("totalQuantity");
let totalPrice = document.getElementById("totalPrice");
let total = 0;
let quantityCart = 0;
let catalogue = [];

fetch("http://localhost:3000/api/products")
  .then((response) => {
    if (response.ok) {
      return response.json();
    }
  })
  .then((productsData) => {
    catalogue = productsData;
  })
  .then((catalogue) => {
    getCart();
  })
  .then((objProducts) => {
    getTotal();
  })
  .then((total) => {
    displayCart();
  })
  .then((fullBasket) => {
    addEvent();
  })
  .catch((error) => {
    console.log("Une erreur est survenue dans l'api");
  });

////////////////// Affichage du panier //////////////////

function displayCart() {
  for (product of objProducts) {
    cartItems.innerHTML += `
    <article class="cart__item" data-id=${product.id} data-color=${product.color}>
    <div class="cart__item__img">
    ${product.image}
    </div>
    <div class="cart__item__content">
    <div class="cart__item__content__description">
    <h2>${product.name}</h2>
    <p>Couleur selectionnée : ${product.color}</p>
    <p>Prix unitaire : ${product.price}</p>
    </div>
    <div class="cart__item__content__settings">
    <div class="cart__item__content__settings__quantity">
    <p>Qté : </p>
    <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value=${product.quantity}>
    </div>
    <div class="cart__item__content__settings__delete">
    <br>
    <p class="deleteItem">Supprimer</p>
    </div>
    </div>
    </div>
    </article>
    `;
  }
}
////////////////// Modification quantité du panier //////////////////

function changeQuantity(i, quantity) {
  // Récupère l'ID et la couleur du produit sélectionné
  let id = i.closest(".cart__item").dataset.id;
  let color = i.closest(".cart__item").dataset.color;
  let foundProduct = objProducts.find((p) => p.id == id && p.color == color);
  foundProduct.quantity = quantity;
  // envoi de la quantité au localStorage
  saveCart(objProducts);
  window.location.reload();
}
////////////////// Prix et quantité totale des articles du panier //////////////////

function getTotal() {
  total = 0;
  quantityCart = 0;
  for (let product of objProducts) {
    let foundProduct = catalogue.find((p) => p._id == product.id);
    product.price = foundProduct.price;
    // calcul quantité * prix
    total += product.quantity * foundProduct.price;
    quantityCart += parseInt(product.quantity, 10);
  }
  // Affichage du total
  totalPrice.innerHTML = total;
  // Affichage de la quanité totale
  totalQuantity.innerHTML = quantityCart;
}
////////////////// Event modifier quantité ou supprimer un produit du panier //////////////////

function addEvent() {
  let inputQuantity = document.querySelectorAll(".itemQuantity");
  // Ecouter l'evenement au changement de quantité
  for (let input of inputQuantity) {
    input.addEventListener("change", (e) => {
      changeQuantity(input, e.target.value);
    });
  }

  let deleteProduct = document.querySelectorAll(".deleteItem");
  // Ecouter l'evenement au click sur les boutons "supprimer"
  for (let i = 0; i < deleteProduct.length; i++) {
    deleteProduct[i].addEventListener("click", (event) => {
      event.preventDefault();
      // Suppression du produit sélectionné
      objProducts.splice(i, 1);
      saveCart(objProducts);
      location.reload();
    });
  }
}

////////////////// Verification des données du formulaire //////////////////

function validateAlpha(champs, message) {
  // vérification si les informations sont au format attendu
  let regex = /^[a-zA-Z]{2,}$/;
  if (!regex.test(champs.value)) {
    // Mise en style
    champs.setAttribute(
      "style",
      "font-style : italic; border:2px solid #09078c"
    );
    champs.focus();
    message.textContent = "Saisie incorrecte";
    // retourne la non validation
    return false;
  } else {
    // retrait du style
    champs.removeAttribute("style");
    message.textContent = "";
    // retourne la validation
    return true;
  }
}
////////////////// Verification adresse du formulaire //////////////////

function validateAlphaNum(champs, message) {
  // vérification si les informations sont au format attendu
  let regex = /^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*$/;
  if (!regex.test(champs.value)) {
    // Mise en style
    champs.setAttribute(
      "style",
      "font-style : italic; border:2px solid #09078c"
    );
    champs.focus();
    message.textContent = "Adresse incorrecte";
    // retourne la non validation
    return false;
  } else {
    // retrait du style
    champs.removeAttribute("style");
    message.textContent = "";
    // retourne la validation
    return true;
  }
}
////////////////// verification email avec regex//////////////////

function validateMail(champs, message) {
  // vérification si les informations sont au format attendu
  let regex = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
  if (!regex.test(champs.value)) {
    // Mise en style
    champs.setAttribute(
      "style",
      "font-style : italic; border:2px solid #09078c"
    );
    message.textContent = "Email incorrect";
    champs.focus();
    // retourne la non validation
    return false;
  } else {
    // retrait du style
    champs.removeAttribute("style");
    message.textContent = "";
    // retourne la validation
    return true;
  }
}

////////////////// Validation du formulaire //////////////////

// Objet contact pour API
let contact;
// Pointeurs
const nom = document.getElementById("firstName");
const prenom = document.getElementById("lastName");
const adresse = document.getElementById("address");
const ville = document.getElementById("city");
const mail = document.getElementById("email");
const nomErr = document.getElementById("firstNameErrorMsg");
const prenomErr = document.getElementById("lastNameErrorMsg");
const adresseErr = document.getElementById("addressErrorMsg");
const villeErr = document.getElementById("cityErrorMsg");
const mailErr = document.getElementById("emailErrorMsg");

function validateForm() {
  // Contrôle du nom, prenom et de la ville
  let nomValide = validateAlpha(nom, nomErr);
  let prenomValide = validateAlpha(prenom, prenomErr);
  let villeValide = validateAlpha(ville, villeErr);
  let adresseValide = validateAlphaNum(adresse, adresseErr);
  let mailValide = validateMail(mail, mailErr);
  if (nomValide && prenomValide && villeValide && mailValide && adresseValide) {
    contact = {
      firstName: nom.value,
      lastName: prenom.value,
      address: adresse.value,
      city: ville.value,
      email: mail.value,
    };
    // Envoyer le formulaire
    return true;
  } else {
    // Bloquer l'envoi du formulaire
    return false;
  }
}

// Attribut onsubmit pour bloquer la validation du formulaire si la fonction retourne false
document
  .querySelector(".cart__order__form")
  .setAttribute("onsubmit", "return validateForm();");

// Tableau d'id pour l'envoyer a l'API
let products = [];
for (i = 0; i < objProducts.length; i++) {
  products.push(objProducts[i].id);
}

////////////////// requete POST pour envoyer les données //////////////////

async function validateCart() {
  await validateForm();
  let toSend = { contact, products };
  fetch("http://localhost:3000/api/products/order", {
    method: "post",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(toSend),
  })
    .then(async function (data) {
      const response = await data.json();

      if (data.ok) {
        // Renvoie vers la page de confirmation avec l'ID et vide le localStorage
        window.location = `../html/confirmation.html?id=${response.orderId}`;
        localStorage.clear();
      } else {
        console.log(`Réponse du serveur : `, data.status);
      }
    })
    .catch(function (error) {
      console.log("Request failed", error);
    });
}

////////////////// Evenement sur bouton commander //////////////////

document.getElementById("order").addEventListener("click", (e) => {
  e.preventDefault();
  validateCart();
});
