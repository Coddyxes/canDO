const addedTask = document.querySelector(".content__form-add");
const inputForm = document.querySelector(".form-add__input");

addedTask.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const taskList = document.querySelector(".content__task-list");
  const template = document.querySelector(".template__task").content.cloneNode(true);
  const deleteButton = template.querySelector("button");
  deleteButton.onclick = function(){
   this.parentElement.remove();
  };
  template.querySelector("li").prepend(inputForm.value);
  taskList.appendChild(template);
  inputForm.value = "";
});