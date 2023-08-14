var orderListEndpoint = "https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/orders";
var orderListElement = document.getElementById("orderList");
var searchInput = document.getElementById("searchInput");
var searchBtn = document.getElementById("searchBtn");
var resetBtn = document.getElementById("resetBtn");

function fetchOrders() {
  fetch(orderListEndpoint)
    .then(response => response.json())
    .then(orders => {
      displayOrders(orders);
    })
    .catch(error => {
      console.error("Error fetching orders:", error);
    });
}


function displayOrders(orders) {
  orderListElement.innerHTML = "";
  orders.forEach(order => {
    const orderRow = document.createElement("tr");
    orderRow.innerHTML = `
      <td>${order.id}</td>
      <td>${order.customerName}</td>
      <td>${order.orderDate}</td>
      <td>${order.orderTime}</td>
      <td>${order.amount}</td>
      <td>${order.orderStatus}</td>
    `;
    orderListElement.appendChild(orderRow);
  });
}

function filterOrders() {
  const filterOptions = [];
  if (newCheckbox.checked) filterOptions.push("New");
  if (packedCheckbox.checked) filterOptions.push("Packed");
  if (inTransitCheckbox.checked) filterOptions.push("InTransit");
  if (deliveredCheckbox.checked) filterOptions.push("Delivered");

  fetch(orderListEndpoint)
    .then(response => response.json())
    .then(orders => {
      const filteredOrders = orders.filter(order => filterOptions.includes(order.orderStatus));
      displayOrders(filteredOrders);
    })
    .catch(error => {
      console.error("Error fetching filtered orders:", error);
    });
}

newCheckbox.addEventListener("change", filterOrders);
packedCheckbox.addEventListener("change", filterOrders);
inTransitCheckbox.addEventListener("change", filterOrders);
deliveredCheckbox.addEventListener("change", filterOrders);


fetchOrders();