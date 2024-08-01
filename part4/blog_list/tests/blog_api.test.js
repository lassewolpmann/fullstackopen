const { test, describe, after, beforeEach } = require("node:test");
const assert = require("node:assert");
const mongoose = require("mongoose");
const supertest = require("supertest");
const bcrypt = require("bcrypt");
const app = require("../app");
const api = supertest(app);
const Blog = require("../models/blogSchema");
const User = require("../models/userSchema");
const helper = require("./test_helper");

let token = "";

beforeEach(async () => {
  await Blog.deleteMany({});
  console.log("cleared blogs");

  await User.deleteMany({});
  console.log("cleared users");

  const passwordHash = await bcrypt.hash("secretHash", 10);
  const rootUser = new User({
    username: "root",
    password: passwordHash,
    name: "Superuser",
  });

  await rootUser.save();
  console.log("saved root user");

  for (const blog of helper.initialBlogs) {
    let blogObject = new Blog({
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes,
      user: rootUser._id,
    });
    const savedBlog = await blogObject.save();

    rootUser.blogs = rootUser.blogs.concat(savedBlog._id);
    await rootUser.save();

    console.log("saved blog");
  }

  const res = await api
    .post("/api/login")
    .send({
      username: "root",
      password: "secretHash",
    })
    .expect("Content-Type", /application\/json/);

  token = res.body.token;

  console.log("done");
});

describe("general data tests", () => {
  test("correct amount of blogs are returned as json", async () => {
    const res = await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);

    assert.strictEqual(res.body.length, helper.initialBlogs.length);
  });

  test("identifier property is named id", async () => {
    const res = await api.get("/api/blogs");
    const blogs = res.body;

    for (const blog of blogs) {
      const keys = Object.keys(blog);
      assert(keys.includes("id"));
    }
  });
});

describe("create new blog post", () => {
  test("create new blog entry with valid token", async () => {
    const newBlogPost = {
      title: "Test Blog Post 3",
      author: "Test Author 3",
      url: "test",
      likes: 333,
    };

    await api
      .post("/api/blogs")
      .send(newBlogPost)
      .set("Authorization", "Bearer " + token)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const blogsAfterPost = await helper.blogsInDb();
    const newestBlog = blogsAfterPost[blogsAfterPost.length - 1];
    assert.deepStrictEqual(newBlogPost.title, newestBlog.title);
    assert.deepStrictEqual(newBlogPost.author, newestBlog.author);
    assert.deepStrictEqual(newBlogPost.url, newestBlog.url);
    assert.deepStrictEqual(newBlogPost.likes, newestBlog.likes);

    assert.strictEqual(blogsAfterPost.length, helper.initialBlogs.length + 1);
  });

  test("missing likes property", async () => {
    const newBlogPost = {
      title: "Test Blog Post 3",
      author: "Test Author 3",
      url: "test",
    };

    await api
      .post("/api/blogs")
      .send(newBlogPost)
      .set("Authorization", "Bearer " + token)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const blogsAfterPost = await helper.blogsInDb();
    const newestBlog = blogsAfterPost[blogsAfterPost.length - 1];
    assert.strictEqual(newestBlog.likes, 0);
  });

  test("missing title or url property", async () => {
    const newBlogPost = {
      likes: 10,
    };

    await api
      .post("/api/blogs")
      .send(newBlogPost)
      .set("Authorization", "Bearer " + token)
      .expect(400);
  });

  test("missing or invalid token", async () => {
    const blogsBeforePost = await helper.blogsInDb();

    const newBlogPost = {
      title: "Invalid Token Blog Post",
      author: "Unauthorized Person",
      url: "test",
      likes: 666,
    };

    await api
      .post("/api/blogs")
      .send(newBlogPost)
      .expect(401)
      .expect("Content-Type", /application\/json/);

    const blogsAfterPost = await helper.blogsInDb();

    assert.strictEqual(blogsBeforePost.length, blogsAfterPost.length);
  });
});

describe("create new user", () => {
  test("creating new user with valid input", async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: "lwolpmann",
      password: "secretpassword",
      name: "Lasse Wolpmann",
    };

    await api
      .post("/api/users")
      .send(newUser)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const usersAtEnd = await helper.usersInDb();
    assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1);

    const usernames = usersAtEnd.map((user) => user.username);
    assert(usernames.includes(newUser.username));
  });

  test("test non-unique username", async () => {
    const usersAtStart = await helper.usersInDb();
    const firstUser = usersAtStart[0];

    const newUser = {
      username: firstUser.username,
      password: "secretpassword",
      name: firstUser.name,
    };

    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    const usersAtEnd = await helper.usersInDb();
    assert(result.body.error.includes("expected `username` to be unique"));

    assert.strictEqual(usersAtEnd.length, usersAtStart.length);
  });

  test("password too short", async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: "insecureUser",
      password: "ab",
    };

    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    const usersAtEnd = await helper.usersInDb();
    assert(
      result.body.error.includes("Password must be at least 3 characters"),
    );

    assert.strictEqual(usersAtEnd.length, usersAtStart.length);
  });
});

describe("delete blog post", () => {
  test("valid token", async () => {
    let blogsBeforeDeletion = await helper.blogsInDb();
    let id = blogsBeforeDeletion[0].id;

    await api
      .delete(`/api/blogs/${id}`)
      .set("Authorization", "Bearer " + token)
      .expect(204);

    let blogsAfterDeletion = await helper.blogsInDb();

    assert.strictEqual(
      blogsAfterDeletion.length,
      blogsBeforeDeletion.length - 1,
    );
  });

  test("missing or invalid token", async () => {
    let blogsBeforeDeletion = await helper.blogsInDb();
    let id = blogsBeforeDeletion[0].id;

    await api.delete(`/api/blogs/${id}`).expect(401);

    let blogsAfterDeletion = await helper.blogsInDb();

    assert.strictEqual(blogsAfterDeletion.length, blogsBeforeDeletion.length);
  });

  test("unauthorized token", async () => {
    // Step 1: Since the token is created for the root user, create a new user here
    const newUser = {
      username: "newUser",
      password: "secretpassword",
      name: "New User",
    };

    await api.post("/api/users").send(newUser).expect(201);

    // Step 2: Create token for new user
    const res = await api
      .post("/api/login")
      .send({
        username: "newUser",
        password: "secretpassword",
      })
      .expect("Content-Type", /application\/json/);

    token = res.body.token;

    // Step 3: Try to delete a blog post with this token
    let blogsBeforeDeletion = await helper.blogsInDb();
    let id = blogsBeforeDeletion[0].id;

    const result = await api
      .delete(`/api/blogs/${id}`)
      .set("Authorization", "Bearer " + token)
      .expect(401)
      .expect("Content-Type", /application\/json/);

    let blogsAfterDeletion = await helper.blogsInDb();

    assert(result.body.error.includes("user not authorized"));
    assert.strictEqual(blogsAfterDeletion.length, blogsBeforeDeletion.length);
  });
});

describe("update blog post", () => {
  test("update blog post with ID", async () => {
    let blogsBeforeUpdate = await helper.blogsInDb();
    let blog = blogsBeforeUpdate[0];

    const newBlogPost = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
    };

    const res = await api.put(`/api/blogs/${blog.id}`).send(newBlogPost);

    assert.strictEqual(res.body.likes, newBlogPost.likes);
  });
});

after(async () => {
  await mongoose.connection.close();
});
