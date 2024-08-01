import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteBlog, likeBlog } from "../reducers/blogReducer.js";

const Blog = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)
  const id = useParams().id
  const blog = [...blogs].find(blog => blog.id === id)

  const likeBlogPost = async (blog) => {
    dispatch(likeBlog(blog))
  };

  const deleteBlogPost = async (blog) => {
    const confirmation = confirm(`Remove blog ${blog.title} by ${blog.author}`);

    if (confirmation) {
      dispatch(deleteBlog(blog))
      navigate('/')
    }
  };

  if (!blog) {
    return null
  }

  return (
    <div data-testid={blog.title}>
      <h2>{blog.title}</h2>
      <p>{blog.url}</p>
      <p>{blog.likes} likes <button onClick={() => likeBlogPost(blog)}>like</button></p>
      <p>added by {blog.user.name}</p>

      {user.name === blog.user.name && <button onClick={() => deleteBlogPost(blog)}>delete</button>}
    </div>
  );
};

export default Blog;
