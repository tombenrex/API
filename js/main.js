// main.js
import {
  fetchData,
  getRandomUser,
  showMoreInfo,
  startTimer,
  modalElement,
  toggleText,
  showAllUsers,
  allUserContainer,
} from "./script.js";

document.addEventListener("DOMContentLoaded", () => {
  fetchData();

  document.getElementById("generate-btn").addEventListener("click", () => {
    startTimer();
  });

  document.getElementById("show-all").addEventListener("click", () => {
    allUserContainer.classList.toggle("active");
    showAllUsers();
  });

  document.getElementById("more-btn").addEventListener("click", function () {
    modalElement.classList.toggle("active");
    toggleText(this);
  });

  setTimeout(() => {
    getRandomUser();
    showMoreInfo();
  }, 500);
});
