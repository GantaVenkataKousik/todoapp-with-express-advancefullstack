/* eslint-disable eol-last */
/* eslint-disable semi */
/* eslint-disable indent */
document.addEventListener("DOMContentLoaded", function () {
  var todoInput = document.getElementById("todo");

  todoInput.addEventListener("focus", function () {
    todoInput.classList.add("todo-input-focused");
    // eslint-disable-next-line semi
  });

  todoInput.addEventListener("blur", function () {
    todoInput.classList.remove("todo-input-focused");
  });
});
