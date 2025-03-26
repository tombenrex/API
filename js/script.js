//Script js
export const modalElement = document.getElementById("modal-content");

const userContainer = document.getElementById("random-user");
const moreLess = document.getElementById("moreLess");
export const allUserContainer = document.getElementById("all-user-modal");

let randomUser = null;
let users = [];

/*-------------------------------------
 1. Fetch to JSON
--------------------------------------*/

export function fetchData() {
  userContainer.innerHTML = "<p>Loading users...</p>";
  fetch("https://jsonplaceholder.typicode.com/users")
    .then((response) => response.json())
    .then((data) => {
      users = data;
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
      userContainer.innerHTML =
        "<p>Error fetching data. Please try again later.</p>";
    });
}

/*-------------------------------------
 2. Generate Random User
--------------------------------------*/

let lastUser = -1;

export function getRandomUser() {
  if (users.length === 0) {
    console.log("No data available. Please fetch the data first.");
    userContainer.innerHTML = "<p>Something went wrong, please try again.</p>";

    return;
  }

  userContainer.innerHTML = "";
  let randomIndex;

  do {
    randomIndex = Math.floor(Math.random() * users.length);
  } while (randomIndex === lastUser);

  lastUser = randomIndex;

  randomUser = users[randomIndex];

  const header = document.createElement("header");
  header.classList.add("article-header");
  header.innerHTML = `<h3>Random User</h3> ${randomUser.id} / ${users.length}`;

  const userName = document.createElement("p");
  userName.innerHTML = `<strong>Name:</strong> ${randomUser.name} `;

  const userUsername = document.createElement("p");
  userUsername.innerHTML = `<strong>Username:</strong> ${randomUser.username}`;

  const userEmail = document.createElement("p");
  userEmail.innerHTML = `<strong>Email:</strong> ${randomUser.email}`;

  userContainer.append(header, userName, userUsername, userEmail);
}

/*-------------------------------------
 3. Toggle more info box
--------------------------------------*/

export function showMoreInfo() {
  if (!randomUser) {
    console.error("No random user available.");
    return;
  }

  modalElement.innerHTML = "";

  const header = document.createElement("header");
  header.classList.add("box-header");
  header.innerHTML = "<h3>More information</h3>";

  const userComp = document.createElement("p");
  userComp.innerHTML = `<strong>Company:</strong> ${randomUser.company.name}`;

  const userPhone = document.createElement("p");
  userPhone.innerHTML = `<strong>Phone:</strong> ${randomUser.phone}`;

  const userAdress = document.createElement("p");
  userAdress.innerHTML = `<strong>Adress:</strong> ${randomUser.address.city}`;

  modalElement.append(header, userComp, userPhone, userAdress);
}

/*-------------------------------------
 4. Generate New User
--------------------------------------*/

let isTimerRunning = false;
export function startTimer() {
  if (isTimerRunning) {
    return;
  }

  let count = 3;
  const timerElement = document.getElementById("timer");
  let interval;

  isTimerRunning = true;

  timerElement.textContent = " in " + count;

  interval = setInterval(() => {
    count--;
    timerElement.textContent = " in " + count;

    if (count < 0) {
      clearInterval(interval);
      timerElement.textContent = "";
      getRandomUser();
      showMoreInfo();
      isTimerRunning = false;
      modalElement.classList.remove("active");
    }
  }, 1000);
}

/*-------------------------------------
 5. Change text on show more button
--------------------------------------*/

export function toggleText(button) {
  if (moreLess.style.display === "none" || moreLess.style.display === "") {
    moreLess.style.display = "inline";
    button.textContent = "Show Less";
  } else {
    moreLess.style.display = "none";
    button.textContent = "Show More";
  }
}

/*-------------------------------------
 6. Show all users
--------------------------------------*/

export function showAllUsers() {
  allUserContainer.innerHTML = ""; // Clear the container

  const header = document.createElement("header");
  header.classList.add("article-header");
  header.innerHTML = `<h3>All Users</h3>`;

  allUserContainer.appendChild(header);

  // Create the table structure
  const table = document.createElement("table");
  table.classList.add("user-table");

  // Create table header
  const thead = document.createElement("thead");
  const headerRow = document.createElement("tr");

  const thName = document.createElement("th");
  thName.textContent = "Name";

  const thUsername = document.createElement("th");
  thUsername.textContent = "Username";

  const thEmail = document.createElement("th");
  thEmail.textContent = "Email";

  headerRow.appendChild(thName);
  headerRow.appendChild(thUsername);
  headerRow.appendChild(thEmail);
  thead.appendChild(headerRow);
  table.appendChild(thead);

  // Create table body
  const tbody = document.createElement("tbody");

  users.forEach((user) => {
    const row = document.createElement("tr");

    const tdName = document.createElement("td");
    tdName.textContent = user.name;

    const tdUsername = document.createElement("td");
    tdUsername.textContent = user.username;

    const tdEmail = document.createElement("td");
    tdEmail.textContent = user.email;

    row.appendChild(tdName);
    row.appendChild(tdUsername);
    row.appendChild(tdEmail);
    tbody.appendChild(row);
  });

  table.appendChild(tbody);
  allUserContainer.appendChild(table);
}
