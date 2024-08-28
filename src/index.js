import "./styles/index.css";
import "./styles/global.css";
import "./styles/media.css";
import "./styles/popup.css";
import { openPopup, closePopup } from "./script/modal";

const formAddTask = document.querySelector(".form-add-task");
const inputAddTask = document.querySelector(".todo__add-task-input");
const tasksList = document.querySelector(".todo__tasks-list");
const closeButton = document.querySelector(".popup__close-btn");
const popup = document.querySelector(".popup");

formAddTask.addEventListener("submit", addTask);

function addTask(event) {
  event.preventDefault();

  const taskText = inputAddTask.value;
  const taskHTML = `
       <li class="todo__tasks-item">
          <h4 class="todo__tasks-items-title">
              ${taskText}
          </h4>
          <button class="todo__tasks-items-button" >Открыт</button>
      </li>`;

  tasksList.insertAdjacentHTML("beforeend", taskHTML);
  inputAddTask.value = "";
  inputAddTask.focus();
}

tasksList.addEventListener("click", deleteTask);

function deleteTask(event) {
  if (event.target.dataset.action === "delete") {
    const parent = event.target.closest(".todo__tasks-item");
    console.log(parent);
  }
}

tasksList.addEventListener("click", () => {
  openPopup(popup);
});

/* closeButton.forEach((button) => {
  button.addEventListener("click", () => {
    closePopup(button.closest(".popup_is-opened"));
  });
}); */

/* 
const openPopupBtn = document.querySelector(".todo__tasks-items-button");
const popup = document.querySelector(".popup");
const todoTasksList = document.querySelector(".todo__tasks-list"); 
const todoTasksItem = todoTasksList.querySelector(".todo__tasks-item");
const todoTaskTitle = document.querySelector(".todo__tasks-items-title");
const deleteButtonTask = document.getElementById("delete-btn");
const inputPopup = document.querySelector(".popup__input");
let todos = []; */
/* function todoLocal() {
  todos = todoTasksList.innerHTML;
  localStorage.setItem("todos", todos);
}

if (localStorage.getItem("todos")) {
  todoTasksList.innerHTML = localStorage.getItem("todos");
} */
/* formAddTask.addEventListener('submit', createTask)
addTaskButton.addEventListener("click", createTask);

function createTask(event) {
  event.preventDefault();
  let createElement = document.createElement("li");
  createElement.className = "todo__tasks-item";
  todoTasksList.appendChild(createElement);
  createElement.id = "";
  let h4 = document.createElement("h4");
  h4.className = "todo__tasks-items-title";
  h4.textContent = inputAddTask.value;
  let createButtonElement = document.createElement("button");
  createButtonElement.className = "todo__tasks-items-button";
  createButtonElement.textContent = "Открыт";

  createElement.appendChild(h4);
  createElement.appendChild(createButtonElement);
  todoLocal();
  inputAddTask.value = "";
}

todoTasksList.addEventListener("click", () => {
  openPopup(popup);
});

closeButton.forEach((button) => {
  button.addEventListener("click", () => {
    closePopup(button.closest(".popup_is-opened"));
  });
});

deleteButtonTask.addEventListener("click", deleteTask);

function deleteTask(event) {
  if (event.target.dataset.action === "delete") {
    let listElement = document.querySelector(".todo__tasks-item");
    let listItem = listElement.parentNode;
    let list = listItem.parentNode;
    list.removeChild(listItem);
  }
}
 */
