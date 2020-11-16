let addedTask = document.querySelector(".content__form-add");
let inputForm = document.querySelector(".form-add__input");

addedTask.addEventListener("submit", (evt) => {
  evt.preventDefault();
  let taskList = document.querySelector(".content__task-list");
  let template = document.querySelector(".template__task").content.cloneNode(true);
  template.querySelector("li").append(inputForm.value);
  taskList.appendChild(template);
  inputForm.value = "";
});