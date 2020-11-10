var express = require("express");
var router = express.Router();

const Todo = require("../models/Todo");

/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("index", { title: "Express" });
});

/**
 * Todo List API's
 */

// Get all Todos
router.get("/todo", async (req, res) => {
  try {
    const todos = await Todo.find({});
    res.render("todo", { todos });
  } catch (err) {
    res.send(err);
  }
});

//Create a Todo
router.post("/todo/add", async (req, res) => {
  try {
    console.log(req.body);
    const todo = new Todo(req.body);
    await todo.save();
    res.redirect("/todo");
  } catch (err) {
    res.status(500).json({ Error: "Unable to Update/Save Todos" });
  }
});

router.post("/todo/edit/:id", async (req, res) => {
  try {
    await Todo.findByIdAndUpdate(req.params.id, {
      $set: { task: req.body.task, isEdit: false }
    }),
      { useFindAndModify: true };
    res.redirect("/todo");
  } catch (err) {
    res.status(500).json({ Error: "Unable to Update/Save Todos" });
  }
});

router.get("/todo/edit/:id", async (req, res) => {
  try {
    await Todo.findByIdAndUpdate(
      req.params.id,
      {
        $set: { isEdit: true }
      },
      { useFindAndModify: false }
    );
    const todos = await Todo.find({});
    res.render("edit", { todos });
  } catch (err) {
    res.status(500).json({ Error: "Unable to Edit Todos" });
  }
});

// Delete a Todo
router.post("/todo/delete/:id", async (req, res) => {
  try {
    await Todo.findByIdAndDelete(req.params.id);
    res.redirect("/todo");
  } catch (err) {
    res.status(500).json({ Error: "Unable to Delete Todo" });
  }
});

module.exports = router;
