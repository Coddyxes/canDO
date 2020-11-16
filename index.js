let addedTask = document.querySelector(".content__form-add");
let inputForm = document.querySelector(".form-add__input");

addedTask.addEventListener("submit", (evt) => {
  evt.preventDefault();
  let taskList = document.querySelector(".content__task-list");
  let node = document.createElement("li");
  let textNode = document.createTextNode(inputForm.value);

  let templateNode = document.querySelector(".template__task");
  let newTemplateNode = templateNode.content;
  newTemplateNode.textContent = inputForm.value;

  node.appendChild(textNode);
  taskList.appendChild(node);
  taskList.appendChild(templateNode.content);
  inputForm.value = "";
});