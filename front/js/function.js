function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
  console.log("initialisation localStorage");
}
