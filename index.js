const addedTask = document.querySelector(".content__form-add");
const inputForm = document.querySelector(".form-add__input");

addedTask.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const taskList = document.querySelector(".content__task-list");
  const template = document.querySelector(".template__task").content.cloneNode(true);
  const deleteButton = template.querySelector(".task__close");
  const textAreaLi = template.querySelector(".task__text");
  textAreaLi.value = inputForm.value;
  deleteButton.onclick = function(){
   this.parentElement.parentElement.remove();
  };
  const completeButton = template.querySelector(".task__complete");
  completeButton.onclick = () => {
    if(!textAreaLi.classList.contains('task__text--complete')){
      textAreaLi.classList.add("task__text--complete");
      completeButton.classList.add("task__complete--set");
    } else {
      textAreaLi.classList.remove("task__text--complete");
      completeButton.classList.remove("task__complete--set");
    }
  }
  taskList.appendChild(template);
  inputForm.value = "";
});