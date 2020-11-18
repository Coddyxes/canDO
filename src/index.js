"use strict";

const taskList = document.querySelector(".content__task-list");
const addedTask = document.querySelector(".content__form-add");
const inputForm = document.querySelector(".form-add__input");

addedTask.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const template = document
    .querySelector(".template__task")
    .content.cloneNode(true);
  const deleteButton = template.querySelector(".task__close");
  const textAreaLi = template.querySelector(".task__text");
  textAreaLi.value = inputForm.value;
  deleteButton.onclick = function () {
    this.parentElement.parentElement.remove();
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
  };
  taskList.appendChild(template);
  inputForm.value = "";
});

// search

const showAll = function () {
  for (let i = 0; i < taskList.querySelectorAll("li").length; i++) {
    taskList.querySelectorAll("li").item(i).classList.remove("hide");
  }
};

const contentSearch = document.querySelector(".content__search");
const searchInput = document.querySelector(".search__input");

contentSearch.addEventListener("submit", (evt) => {
  evt.preventDefault();
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
});

// filter

const goFilterList = function (whichFilter) {
  for (let i = 0; i < taskList.querySelectorAll("li").length; i++) {
    if (
      taskList
        .querySelectorAll("li")
        .item(i)
        .querySelector(".task__text")
        .classList.contains('task__text--complete')
    ) {
      if (whichFilter){
        taskList.querySelectorAll("li").item(i).classList.add("hide");
      }
    } else {
      if (!whichFilter){
        taskList.querySelectorAll("li").item(i).classList.add("hide");
      }
    }
  }
} 

document.querySelector(".filter__all").addEventListener("click", (evt) => {
  evt.preventDefault();
  showAll();
});

document
  .querySelector(".filter__in-process")
  .addEventListener("click", (evt) => {
    evt.preventDefault();
    showAll();
    goFilterList(true);
  });

document
  .querySelector(".filter__completed")
  .addEventListener("click", (evt) => {
    evt.preventDefault();
    showAll();
    goFilterList(false);
  });
