const form = document.querySelector(".submit-form"),
  input = document.getElementById("todo-input"),
  formBtn = document.getElementById("submit-btn"),
  todosContainer = document.querySelector(".items");

/* form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (!input.value) return;
  console.log(input.value);
}); */

formBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (!input.value) return;
  console.log(input.value);
  createTodo(input.value);
  input.value = "";
});
input.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    // code for enter
    if (!input.value) return;
    console.log(input.value);
    createTodo(input.value);
    input.value = "";
  }
});

let createTodo = (inputL) => {
  let div = document.createElement("div");
  div.innerHTML = ulItem(inputL);
  todosContainer.appendChild(div);
  let remove = document.querySelectorAll(".item-delete");
  let ulText = document.querySelectorAll(".item-todo");
  remove.forEach((e) => {
    e.addEventListener("click", (el) => {
      e.parentNode.remove(div);
    });
  });
};
let ulItem = (e) => {
  return `  
    <ul class='item-todo'>${e}</ul>
    <button class='item-delete' id='${e}'>Delete</button>
    `;
};
