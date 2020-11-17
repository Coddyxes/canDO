let addedTask = document.querySelector(".content__form-add");
let inputForm = document.querySelector(".form-add__input");

addedTask.addEventListener("submit", (evt) => {
  evt.preventDefault();
  let taskList = document.querySelector(".content__task-list");
  let template = document.querySelector(".template__task").content.cloneNode(true);
  let deleteButton = document.createElement("button");
  let dltBtnText = document.createTextNode("Delete item");
  deleteButton.appendChild(dltBtnText); 
  deleteButton.onclick = function(){
   this.parentElement.remove();
  };
  template.querySelector("li").append(inputForm.value);
  template.querySelector("li").append(deleteButton);
  taskList.appendChild(template);
  inputForm.value = "";
});