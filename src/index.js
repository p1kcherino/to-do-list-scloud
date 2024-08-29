import "./styles/index.css";
import "./styles/global.css";
import "./styles/media.css";
import "./styles/popup.css";
import { openPopup, closePopup } from "./script/modal";

const formAddTask = document.querySelector(".form-add-task");
const inputAddTask = document.querySelector(".todo__add-task-input");
const clearButton = document.getElementById("clearButton");
const tasksList = document.querySelector(".todo__tasks-list");
const taskTitle = document.querySelector(".todo__tasks-items-title");
const closeButton = document.querySelectorAll(".popup__close-btn");
const popup = document.querySelector(".popup");
const deleteTaskButton = document.getElementById("removeBtn");
const popupInput = popup.querySelector(".popup__input");
const popupEditButton = popup.querySelector(".popup__btn-apply");
const statusButtons = document.querySelectorAll(".popup__status-button");

formAddTask.addEventListener("submit", addTask);

let tasks = [];

if (localStorage.getItem("tasks")) {
  tasks = JSON.parse(localStorage.getItem("tasks"));
  tasks.forEach(function (task) {
    renderTask(task);
  });
  updateCount();
  editTask();
}
function addTask(event) {
  event.preventDefault();

  const taskText = inputAddTask.value;

  const newTask = {
    id: Date.now(),
    text: taskText,
    status: "Открыт",
  };

  tasks.push(newTask);
  editTask();
  saveToLocalStorage();

  renderTask(newTask);

  inputAddTask.value = "";
  inputAddTask.focus();
  updateCount();
}

let currentItemId = null;

function editTask() {
  tasksList.addEventListener("click", function (event) {
    if (
      event.target.tagName === "LI" ||
      event.target.tagName === "BUTTON" ||
      event.target.tagName === "H4"
    ) {
      currentItemId = event.target.closest("li").id;
      const taskText = event.target
        .closest("li")
        .querySelector(".todo__tasks-items-title")
        .textContent.trim();
      popupInput.value = taskText;
      popupInput.focus();
      openPopup(popup);
      updateCount();
      saveToLocalStorage();
    }
  });

  deleteTaskButton.addEventListener("click", function () {
    if (currentItemId) {
      const item = document.getElementById(currentItemId);
      if (item) {
        item.parentNode.removeChild(item);
        tasks = tasks.filter((task) => task.id !== parseInt(currentItemId));
        closePopup(popup);
        updateCount();
        saveToLocalStorage();
      }
    }
  });

  popupEditButton.addEventListener("click", function () {
    const newText = popupInput.value;
    const item = document.getElementById(currentItemId);
    if (item) {
      item.querySelector(".todo__tasks-items-title").textContent = newText;
      closePopup(popup);
      saveToLocalStorage();
    }
  });
}

clearButton.addEventListener("click", function (event) {
  event.preventDefault();
  inputAddTask.value = "";
});

closeButton.forEach((button) => {
  button.addEventListener("click", function () {
    closePopup(button.closest(".popup_is-opened"));
  });
});

function updateCount() {
  const openCount = tasks.filter((task) => task.status === "Открыт").length;
  const inProgressCount = tasks.filter(
    (task) => task.status === "В работе"
  ).length;
  const closeCount = tasks.filter((task) => task.status === "Закрыт").length;
  document.getElementById("openCount").textContent = openCount;
  document.getElementById("closeCount").textContent = closeCount;
  document.getElementById("inProgressCount").textContent = inProgressCount;
  saveToLocalStorage();
}

function changeStatus(taskId, newStatus) {
  const task = tasks.find((task) => task.id === parseInt(taskId));
  if (task) {
    task.status = newStatus;
    const item = document.getElementById(taskId);
    if (item) {
      item.querySelector(".todo__tasks-items-button").textContent = newStatus;
    }
    updateCount();
    saveToLocalStorage();
  }
}

statusButtons.forEach((button) => {
  button.addEventListener("click", function () {
    const newStatus = button.getAttribute("data-status");
    changeStatus(currentItemId, newStatus);
    closePopup(popup);
    saveToLocalStorage();
  });
});

function saveToLocalStorage() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTask(task) {
  const taskHTML = `
  <li class="todo__tasks-item" id="${task.id}" >
      <h4 class="todo__tasks-items-title">
          ${task.text}
      </h4>
      <button class="todo__tasks-items-button">${task.status}</button>
  </li>`;

  tasksList.insertAdjacentHTML("beforeend", taskHTML);
}
