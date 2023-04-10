const categoryList = document.querySelector(".category-list");
const productList = document.querySelector(".product-list");
const openBtn = document.getElementById("cart-btn");
const closeBtn = document.querySelector("#close-btn");
const modal = document.getElementById("modal-wrapper");
const modalList = document.querySelector(".modal-list");
const totalInfo = document.querySelector("#total");
document.addEventListener("DOMContentLoaded", () => {
  fetchCategories();
  fetchProducts();
});

const fetchCategories = () => {
  fetch("https://fakestoreapi.com/products")
    .then((res) => res.json())
    .then((data) =>
      data.slice(1, 5).forEach((category) => {
        const categoryDiv = document.createElement("div");
        categoryDiv.classList.add("category");
        categoryDiv.innerHTML = `<img src="${category.image}" >
        <p>${category.category}</p>`;
        categoryList.appendChild(categoryDiv);
      })
    )
    .catch((err) => console.log(err));
};

const fetchProducts = () => {
  fetch("https://fakestoreapi.com/products")
    .then((res) => res.json())
    .then((data) =>
      data.slice(3, 20).forEach((product) => {
        const productDiv = document.createElement("div");
        productDiv.classList.add("card");
        productDiv.innerHTML = `  <img src="${product.image}" >
        <p>${product.title}</p>
        <p>${product.category}</p>
        <div class="card-footer">
            <span>${product.price} $</span>
            <button onClick='addCart({id:"${product.id}", name:"${product.title}",price:"${product.price}", img:"${product.image}",amount:1 })' >Add a Cart</button>
        </div>`;
        productList.appendChild(productDiv);
      })
    );
  // .catch((err) => console.log(err));
};
//add cart

let cart = [];
let totalPrice = 0;

function listCart() {
  cart.forEach((eleman) => {
    const cartItem = document.createElement("div");
    cartItem.classList.add("item");
    cartItem.innerHTML = `
    <img src="${eleman.img}">
    <h2 class="title">${eleman.name}</h2>
    <h2 class="price">${eleman.price}$</h2>
    <div class= "amount"><p>${eleman.amount}</p></div>
    `;
    modalList.appendChild(cartItem);
    totalPrice += eleman.price * eleman.amount;
  });
}

/*modal */
const toggleModal = () => {
  modal.classList.toggle("active");
};

openBtn.addEventListener("click", () => {
  toggleModal();
  listCart();
  totalInfo.innerText = totalPrice;
});
closeBtn.addEventListener("click", () => {
  toggleModal();
  modalList.innerHTML = " ";
  totalPrice = 0;
});

function addCart(param) {
  const foundItem = cart.find((eleman) => eleman.id === param.id);

  if (foundItem) {
    foundItem.amount += 1;
  } else {
    cart.push(param);
  }
}
