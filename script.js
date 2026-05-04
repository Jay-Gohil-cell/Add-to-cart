document.addEventListener("DOMContentLoaded", () => {
  products = [
    { id: 1, name: "Mixer", price:18},
    { id: 2, name: "Blender", price:12},
    { id: 3, name: "Table fan", price:11},
    { id: 4, name: "Mixer", price:10},
  ];

let cart = JSON.parse(localStorage.getItem("shopping_cart")) || [];

  const productList = document.getElementById("product-list");
  const cartItems = document.getElementById("cart-items");
  const emptyCartMessage = document.getElementById("empty-cart");
  const cartTotal = document.getElementById("cart-total");
  const totalPrice = document.getElementById("total-price");
  const checkoutButton = document.getElementById("checkout-btn");

  products.forEach(product => {
    const createDiv = document.createElement("div");
    createDiv.classList.add("product");
    createDiv.innerHTML = `
    <span> ${product.name} - $ ${product.price}</span>
    <button data-id="${product.id}"> Add to cart </button>
    `;

    createDiv.addEventListener("click",(e) =>{
      if(e.target.tagName === "BUTTON"){
        let addProductId = Number(e.target.getAttribute("data-id"));
        const addProduct = products.find((p) => p.id === addProductId);
        cart.push(addProduct);
        addToCart();
      }
    })
    
    productList.appendChild(createDiv);
    showCart();
  });
  
  function addToCart(){
    localStorage.setItem("shopping_cart",JSON.stringify(cart));
    showCart();
  }

  function showCart(){
    let total = 0;
    if(cart.length){
      cartItems.innerHTML = ``;
      cart.forEach((item ,index) => {
        total += item.price;
        const itemShow = document.createElement("div");
        itemShow.innerHTML = `
        <span>${item.name} - $ ${item.price}</span>
        <button btn-id="${index}">❌</button>
        `;
        cartItems.appendChild(itemShow);
        cartTotal.classList.remove("hidden");

        itemShow.addEventListener("click",(e) => {
          if(e.target.tagName === "BUTTON"){
            const deleteId = Number(e.target.getAttribute("btn-id"));
            total -= item.price;
            cart.splice(deleteId , 1);
            showCart();
            addToCart();
          }
        })
      });
    }else {
      showError();
    }
    totalPrice.textContent =`$ ${total}`;
  }
  
  function showError(){
    cartTotal.classList.add("hidden");
    cartItems.innerHTML = `<p>Your cart is empty`;
  }

  checkoutButton.addEventListener("click" , () => {
    cart.length = 0;
    alert("Order confirm ");
    cartItems.innerHTML = `<p>Your cart is empty`;
    total = 0;
    addToCart();
  });
});
