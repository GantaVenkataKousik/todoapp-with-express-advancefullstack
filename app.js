/* eslint-disable no-unused-vars */
/* eslint-disable brace-style */
/* eslint-disable keyword-spacing */
/* eslint-disable space-before-blocks */
/* eslint-disable arrow-spacing */
/* eslint-disable space-before-function-paren */
/* eslint-disable comma-spacing */
/* eslint-disable semi */
/* eslint-disable eol-last */
/* eslint-disable comma-dangle */
/* eslint-disable object-curly-spacing */
/* eslint-disable linebreak-style */
/* eslint-disable quotes */

const express = require("express");
const app = express();
const { Todo } = require("./models");

const path = require("path");
app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: false }));

app.set("view engine", "ejs");

app.get("/", async (request, response) => {
  const allToDos = await Todo.showAll();
  if (request.accepts("html")) {
    response.render("index", {
      allToDos,
    });
  } else {
    return response.json(allToDos);
  }
});

app.get("/todos", async (request, response) => {
  try {
    const todos = await Todo.showAll();
    return response.json(todos);
  } catch (error) {
    console.log(error);
    return response.status(500).json(error);
  }
});

app.post("/todos", async (request, response) => {
  try {
    const todo = await Todo.addTodo({
      title: request.body.title,
      dueDate: request.body.dueDate,
      completed: false,
    });

    return response.json(todo);
  } catch (error) {
    // eslint-disable-next-line semi
    console.log(error);
    return response.status(500).json(error);
  }
});

app.put("/todos/:id/markAsCompleted", async (request, response) => {
  const todo = await Todo.findByPk(request.params.id);
  console.log(todo);
  try {
    const updatedTodo = await todo.markAsCompleted();
    return response.json(updatedTodo);
  } catch (error) {
    console.log(error);
    return response.status(500).json(error);
  }
});

app.delete("/todos/:id", async (request, response) => {
  try {
    const todo = await Todo.deleteById(request.params.id);
    return response.json(todo);
  } catch (error) {
    console.log(error);
    return response.status(500).json(error);
  }
});

module.exports = app;
