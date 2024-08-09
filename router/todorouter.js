const express = require('express');
const router = express.Router();
const todoController = require("../controller/todocontroller");
router.get("/",todoController.addTodo);
router.post("/inserttodo",todoController.insertTodo);
router.get("/view_todo",todoController.viewTodo);
router.get("/deleteTodo/:id",todoController.deleteTodo);
router.get("/updateTodo/:id",todoController.updateTodo);
router.post("/editTodo",todoController.editTodo);
router.get("/isactive/:id",todoController.isactive);
router.get("/isdeactive/:id",todoController.isdeactive);

module.exports = router;