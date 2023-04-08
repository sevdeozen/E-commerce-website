const categoryList = document.querySelector(".category-list");
document.addEventListener("DOMContentLoaded", () => {
  fetchCategories();
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
