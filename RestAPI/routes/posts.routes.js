module.exports = app => {
    const posts = require("../controllers/posts.controller.js");
    var router = require("express").Router();
    // Create a new Post
    router.post("/", posts.create);
    // Retrieve all Posts
    router.get("/", posts.findAll);
    // Delete a Post with id
    router.delete("/:id", posts.delete);
    app.use('/api/posts', router);
  };