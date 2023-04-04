const express = require("express");
const todoController = require("../controllers/todo.controller");
const validateTodo = require("../middlewares/validations/todo");
const todoRouter = express.Router();

todoRouter.get("/", todoController.get);
todoRouter.get("/:id", todoController.getByID);
todoRouter.post("/", validateTodo.create, todoController.store);
todoRouter.patch("/:id", validateTodo.edit, todoController.update);
todoRouter.delete("/:id", todoController.remove);

module.exports = todoRouter;
