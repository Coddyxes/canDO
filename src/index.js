"use strict";

const taskList = document.querySelector(".content__task-list");
const addedTask = document.querySelector(".content__form-add");
const inputForm = document.querySelector(".form-add__input");

const createListElement = function (textListElement) {
  const template = document
    .querySelector(".template__task")
    .content.cloneNode(true);
  const deleteButton = template.querySelector(".task__close");
  const textAreaLi = template.querySelector(".task__text");
  textAreaLi.value = textListElement;
  deleteButton.onclick = function () {
    this.parentElement.parentElement.remove();
    saveLocalStorage();
  };

  const completeButton = template.querySelector(".task__complete");
  completeButton.onclick = () => {
    if (!textAreaLi.classList.contains("task__text--complete")) {
      textAreaLi.classList.add("task__text--complete");
      completeButton.classList.add("task__complete--set");
    } else {
      textAreaLi.classList.remove("task__text--complete");
      completeButton.classList.remove("task__complete--set");
    }
    saveLocalStorage();
  };
  taskList.appendChild(template);
  inputForm.value = "";
};

addedTask.addEventListener("submit", (evt) => {
  evt.preventDefault();
  createListElement(inputForm.value);
  saveLocalStorage();
  inputForm.value = "";
});

const showAll = function () {
  for (let i = 0; i < taskList.querySelectorAll("li").length; i++) {
    taskList.querySelectorAll("li").item(i).classList.remove("hide");
  }
  goSearch();
};

// search

const contentSearch = document.querySelector(".content__search");
const searchInput = document.querySelector(".search__input");

const goSearch = function () {
  if (searchInput.value == "") {
    for (let i = 0; i < taskList.querySelectorAll("li").length; i++) {
      taskList.querySelectorAll("li").item(i).classList.remove("hide");
    }
  } else {
    for (let i = 0; i < taskList.querySelectorAll("li").length; i++) {
      if (
        !taskList
          .querySelectorAll("li")
          .item(i)
          .querySelector(".task__text")
          .value.includes(searchInput.value)
      ) {
        taskList.querySelectorAll("li").item(i).classList.add("hide");
      }
    }
  }
};

contentSearch.addEventListener("submit", (evt) => {
  evt.preventDefault();
  goSearch();
});

// filter

const setFilterButtonGreen = function (currentButton) {
  document
    .querySelector(".filter__all")
    .classList.remove("filter__button--green");
  document
    .querySelector(".filter__in-process")
    .classList.remove("filter__button--green");
  document
    .querySelector(".filter__completed")
    .classList.remove("filter__button--green");
  document.querySelector(currentButton).classList.add("filter__button--green");
};

const goFilterList = function (whichFilter) {
  showAll();
  for (let i = 0; i < taskList.querySelectorAll("li").length; i++) {
    if (
      taskList
        .querySelectorAll("li")
        .item(i)
        .querySelector(".task__text")
        .classList.contains("task__text--complete")
    ) {
      if (whichFilter) {
        taskList.querySelectorAll("li").item(i).classList.add("hide");
      }
    } else {
      if (!whichFilter) {
        taskList.querySelectorAll("li").item(i).classList.add("hide");
      }
    }
  }
};

document.querySelector(".filter__all").addEventListener("click", (evt) => {
  evt.preventDefault();
  showAll();
  setFilterButtonGreen(".filter__all");
});

document
  .querySelector(".filter__in-process")
  .addEventListener("click", (evt) => {
    evt.preventDefault();
    goFilterList(true);
    setFilterButtonGreen(".filter__in-process");
  });

document
  .querySelector(".filter__completed")
  .addEventListener("click", (evt) => {
    evt.preventDefault();
    goFilterList(false);
    setFilterButtonGreen(".filter__completed");
  });

// localStorage

const objLocalStorage = {
  value: "",
  isDone: false,
};

const startGetLocalStorage = function () {
  for (let i = 0; i < localStorage.length; i++) {
    let curObjLocalStorage = JSON.parse(localStorage.getItem(`${i}`));
    createListElement(curObjLocalStorage.value);
    if (curObjLocalStorage.isDone) {
      taskList
        .querySelectorAll("li")
        .item(i)
        .querySelector(".task__complete")
        .classList.add("task__complete--set");
      taskList
        .querySelectorAll("li")
        .item(i)
        .querySelector(".task__text")
        .classList.add("task__text--complete");
    }
  }
};

const saveLocalStorage = function () {
  localStorage.clear();
  for (let i = 0; i < taskList.querySelectorAll("li").length; i++) {
    if (
      taskList
        .querySelectorAll("li")
        .item(i)
        .querySelector(".task__complete")
        .classList.contains("task__complete--set")
    ) {
      objLocalStorage.isDone = true;
    } else {
      objLocalStorage.isDone = false;
    }

    objLocalStorage.value = taskList
      .querySelectorAll("li")
      .item(i)
      .querySelector(".task__text").value;
    localStorage.setItem(`${i}`, JSON.stringify(objLocalStorage));
  }
};

startGetLocalStorage();
