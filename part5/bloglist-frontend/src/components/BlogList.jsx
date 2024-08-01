import { useDispatch, useSelector } from "react-redux";
import Blog from "./Blog.jsx";
import { deleteBlog, initializeBlogs, likeBlog } from "../reducers/blogReducer.js";
import { useEffect } from "react";

const BlogList = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch]);

  const blogs = useSelector((state) => state.blogs)
  const user = useSelector(state => state.user)

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