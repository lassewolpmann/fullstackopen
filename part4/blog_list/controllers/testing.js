const router = require("express").Router();
const Blog = require("../models/blogSchema");
const User = require("../models/userSchema");

router.post("/reset", async (request, response) => {
  await Blog.deleteMany({});
  await User.deleteMany({});

  response.status(204).end();
});

module.exports = router;
