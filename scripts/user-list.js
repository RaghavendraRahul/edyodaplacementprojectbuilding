var userListEndpoint = "https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/users";
var userListElement = document.querySelector("tbody");
var searchInput = document.getElementById("searchInput");
var searchBtn = document.getElementById("searchBtn");
var resetBtn = document.getElementById("resetBtn");

function fetchUsers() {
  fetch(userListEndpoint)
    .then(response => response.json())
    .then(users => {
      displayUsers(users);
    })
    .catch(error => {
      console.error("Error fetching users:", error);
    });
}

function displayUsers(users) {
  userListElement.innerHTML = "";
  users.forEach(user => {
    const userRow = document.createElement("tr");
    userRow.innerHTML = `
      <td>${user.id}</td>
      <td>${user.fullName}</td>
      <td>${user.dob}</td>
      <td>${user.gender}</td>
      <td>${user.currentCity}</td>
    `;
    userListElement.appendChild(userRow);
  });
}


function searchUsers() {
  const searchTerm = searchInput.value.trim();
  if (searchTerm.length < 2) {
    alert("Please enter at least 2 characters");
    return;
  }

  fetch(`${userListEndpoint}?fullName=${searchTerm}`)
    .then(response => response.json())
    .then(users => {
      displayUsers(users);
    })
    .catch(error => {
      console.error("Error searching users:", error);
    });
}

function resetUsers() {
  searchInput.value = "";
  fetchUsers();
}

searchBtn.addEventListener("click", searchUsers);
resetBtn.addEventListener("click", resetUsers);

fetchUsers();
