import { useDispatch, useSelector } from "react-redux";
import Blog from "./Blog.jsx";
import { createBlog, deleteBlog, initializeBlogs, likeBlog } from "../reducers/blogReducer.js";
import { useEffect, useRef } from "react";
import NewBlogForm from "./NewBlogForm.jsx";
import Toggleable from "./Toggleable.jsx";

const BlogList = () => {
  const dispatch = useDispatch()
  const blogFormRef = useRef();

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch]);

  const blogs = useSelector((state) => state.blogs)
  const user = useSelector(state => state.user)

  const newBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility();
    dispatch(createBlog(blogObject))
  };

  const likeBlogPost = async (blog) => {
    dispatch(likeBlog(blog))
  };

  const deleteBlogPost = async (blog) => {
    const confirmation = confirm(`Remove blog ${blog.title} by ${blog.author}`);

    if (confirmation) {
      dispatch(deleteBlog(blog))
    }
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
          <Blog
            key={blog.id}
            blog={blog}
            user={user}
            likeBlogPost={() => likeBlogPost(blog)}
            deleteBlogPost={() => deleteBlogPost(blog)}
          />
        ))}
    </>
  )
}

export default BlogList