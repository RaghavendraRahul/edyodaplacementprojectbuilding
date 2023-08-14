var productListEndpoint = "https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/products";
var productListElement = document.querySelector("tbody");
var searchInput = document.getElementById("searchInput");
var searchBtn = document.getElementById("searchBtn");
var resetBtn = document.getElementById("resetBtn");

function fetchProducts() {
  fetch(productListEndpoint)
    .then(response => response.json())
    .then(products => {
      displayProducts(products);
    })
    .catch(error => {
      console.error("Error fetching products:", error);
    });
}

function displayProducts(products) {
  productListElement.innerHTML = "";
  products.forEach(product => {
    const productRow = document.createElement("tr");
    productRow.innerHTML = `
      <td>${product.id}</td>
      <td>${product.medicineName}</td>
      <td>${product.medicineBrand}</td>
      <td>${product.expiryDate}</td>
      <td>${product.stock}</td>
    `;
    productListElement.appendChild(productRow);
  });
}


function isExpired(expiryDate) {
  const currentDate = new Date();
  return new Date(expiryDate) < currentDate;
}

function filterProducts() {
  fetch(productListEndpoint)
    .then(response => response.json())
    .then(products => {
      let filteredProducts = products;
      if (expiryCheckbox.checked) {
        filteredProducts = filteredProducts.filter(product => isExpired(product.expiryDate));
      }
      if (lowStockCheckbox.checked) {
        filteredProducts = filteredProducts.filter(product => product.stock < 100);
      }
      displayProducts(filteredProducts);
    })
    .catch(error => {
      console.error("Error fetching filtered products:", error);
    });
}

expiryCheckbox.addEventListener("change", filterProducts);
lowStockCheckbox.addEventListener("change", filterProducts);

fetchProducts();
