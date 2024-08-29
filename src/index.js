import "./styles/index.css";
import "./styles/global.css";
import "./styles/media.css";
import "./styles/popup.css";
import { openPopup, closePopup } from "./script/modal";

const formAddTask = document.querySelector(".form-add-task");
const inputAddTask = document.querySelector(".todo__add-task-input");
const tasksList = document.querySelector(".todo__tasks-list");
const taskTitle = document.querySelector(".todo__tasks-items-title");
const closeButton = document.querySelectorAll(".popup__close-btn");
const popup = document.querySelector(".popup");
const deleteTaskButton = document.getElementById("removeBtn");
const popupInput = popup.querySelector(".popup__input");
const popupEditButton = popup.querySelector(".popup__btn-apply");

formAddTask.addEventListener("submit", addTask);

let tasks = [];

function addTask(event) {
  event.preventDefault();

  const taskText = inputAddTask.value;

  const newTask = {
    id: Date.now(),
    text: taskText,
    buttonText: "Открыт",
  };

  tasks.push(newTask);

  const taskHTML = `
      <li class="todo__tasks-item" id="${newTask.id}" >
          <h4 class="todo__tasks-items-title">
              ${newTask.text}
          </h4>
          <button class="todo__tasks-items-button">${newTask.buttonText}</button>
      </li>`;

  tasksList.insertAdjacentHTML("beforeend", taskHTML);
  inputAddTask.value = "";
  inputAddTask.focus();
  removeTask();
}

let currentItemId = null;

function removeTask() {
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
      openPopup(popup);
    }
  });

  popupEditButton.addEventListener("click", function () {
    const newText = popupInput.value;
    const item = document.getElementById(currentItemId);
    if (item) {
      item.querySelector(".todo__tasks-items-title").textContent = newText;
      closePopup(popup);
    }
  });
}

closeButton.forEach((button) => {
  button.addEventListener("click", function () {
    closePopup(button.closest(".popup_is-opened"));
  });
});
