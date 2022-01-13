function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
  console.log("creation localStorage");
}
/*
function addCart(product) {
  let cart = getCart();

  let foundProduct = cart.find((p) => p.id == product.id);

  if (foundProduct != undefined) {
    foundProduct.quantity++;
  } else {
    product.quantity = 1;
    cart.push(product);
  }
  saveCart(cart);
}
*/
