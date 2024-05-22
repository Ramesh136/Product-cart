// import { jsonData } from "./utils";
let jsonData = `{
  "products": [
    {
      "id": "1",
      "name": "Wireless Mouse",
      "price": 29.99,
      "rating": 4.5
    },
    {
      "id": "2",
      "name": "Mechanical Keyboard",
      "price": 89.99,
      "rating": 4.7
    },
    {
      "id": "3",
      "name": "HD Monitor",
      "price": 159.99,
      "rating": 4.3
    },
    {
      "id": "4",
      "name": "USB-C Hub",
      "price": 45.99,
      "rating": 4.2
    },
    {
      "id": "5",
      "name": "Bluetooth Speaker",
      "price": 79.99,
      "rating": 4.6
    },
    {
      "id": "6",
      "name": "Gaming Chair",
      "price": 199.99,
      "rating": 4.8
    },
    {
      "id": "7",
      "name": "External SSD",
      "price": 129.99,
      "rating": 4.4
    },
    {
      "id": "8",
      "name": "Smartphone Stand",
      "price": 19.99,
      "rating": 4.1
    },
    {
      "id": "9",
      "name": "Webcam",
      "price": 59.99,
      "rating": 4.0
    },
    {
      "id": "10",
      "name": "Laptop Cooling Pad",
      "price": 34.99,
      "rating": 4.3
    }
  ]
}`;

let products = JSON.parse(jsonData).products
console.log(products)
let cart = []

function createProductCard(product) {
  return `
                <div class="product-card">
                <div>
                    <div class= "name-card">
                    <h2>${product.name}</h2>
                    </div>
                    <p>Price: $${product.price.toFixed(2)}</p>
                    <p>Rating: ${product.rating} ⭐</p>
                </div>
                    <button class="button" onclick="addToCart(${
                      product.id
                    })">Add to Cart</button>
                </div>
            `;
}

function addToCart(productId) {

let exist = cart.find((p)=>p.product.id == productId)
if(exist){
    cart[cart.indexOf(exist)].quantity++
    
  displayCart();
return
}
  const product = products.find(p => p.id == productId);

  cart.push({product,quantity :1});
  displayCart();
}

function displayCart() {
  const cartContainer = document.getElementById("cart");

  cartContainer.innerHTML = ""; // Clear existing cart items
  cart.forEach((product) => {
    cartContainer.innerHTML += `<div class="cart-item" id="cart-item">${
      product.product.name
    } - $${product.product.price.toFixed(2)} x ${product.quantity}<button class="remove-item" id="remove-item">X</button></div>`;
  });
  const total = cart.reduce((total,product)=>{
    return total+(product.quantity*product.product.price)
  },0)
  document.getElementById("total").innerText = `Total - $${total.toFixed(3)}`
  document.getElementById("average").innerText = `Average - $${(
    total / cart.length
  ).toFixed(3)}`;

}

const productContainer = document.getElementById("product-container");
products.forEach((product) => {
  productContainer.innerHTML += createProductCard(product);
});

document.getElementById("total").innerText = `Total - $0`;
document.getElementById("average").innerText = `$0`;

document.getElementById("clear-cart").addEventListener("click",()=>{
    cart = []
  const cartContainer = document.getElementById("cart");
  cartContainer.innerHTML = ""; // Clear existing cart items
  document.getElementById("total").innerText = `Total - $0`;
  document.getElementById("average").innerText = `$0`;
})

document.getElementById("cart").addEventListener("click",(e)=>{
    if (e.target.className === "remove-item") {
        let value = e.target.parentNode.innerHTML.split(" -")[0];
       let found = cart.find(
         (e) => e.product.name === value
       );
       if(found){
        cart.splice(cart.indexOf(found),1)
        displayCart()
       }
    }
});

document.getElementsByClassName("sort")[0].addEventListener("click",()=>{
    
    cart.sort((a,b)=>a.product.price-b.product.price)
    displayCart()
})

document.getElementsByClassName("sort")[1].addEventListener("click", () => {
  
  cart.sort((a, b) => b.product.price - a.product.price);
  displayCart();
});