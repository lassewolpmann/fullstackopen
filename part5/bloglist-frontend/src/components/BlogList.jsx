import { useDispatch, useSelector } from "react-redux";
import { createBlog, deleteBlog, initializeBlogs, likeBlog } from "../reducers/blogReducer.js";
import { useEffect, useRef } from "react";
import NewBlogForm from "./NewBlogForm.jsx";
import Toggleable from "./Toggleable.jsx";
import { Link } from "react-router-dom";

const BlogList = () => {
  const dispatch = useDispatch()
  const blogFormRef = useRef();

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch]);

  const blogs = useSelector((state) => state.blogs)

  const newBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility();
    dispatch(createBlog(blogObject))
  };

  return (
    <>
      <Toggleable buttonLabel="new blog post" ref={blogFormRef}>
        <NewBlogForm newBlog={newBlog} />
      </Toggleable>

      {[...blogs]
        .sort((a, b) => {
          if (a.likes > b.likes) {
            return -1;
          } else if (a.likes < b.likes) {
            return 1;
          } else {
            return 0;
          }
        })
        .map((blog) => (
          <Link key={blog.id} to={`/${blog.id}`}>
            <p>{blog.title} {blog.author}</p>
          </Link>
        ))}
    </>
  )
}

export default BlogList