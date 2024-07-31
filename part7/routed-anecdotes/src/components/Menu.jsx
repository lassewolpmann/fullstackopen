import {
    BrowserRouter as Router,
    Routes, Route, Link
} from 'react-router-dom'

import About from "./About.jsx";
import AnecdoteList from "./AnecdoteList.jsx";
import CreateNew from "./CreateNew.jsx";

const Menu = ({ anecdotes, addNew }) => {
    const padding = {
        paddingRight: 5
    }
    return (
        <Router>
            <div>
                <Link style={padding} to="/">anecdotes</Link>
                <Link style={padding} to="/create">create new</Link>
                <Link style={padding} to="/about">about</Link>
            </div>

            <Routes>
                <Route path="/" element={<AnecdoteList anecdotes={anecdotes} />} />
                <Route path="/create" element={<CreateNew addNew={addNew} />} />
                <Route path="/about" element={<About />} />
            </Routes>
        </Router>
    )
}

export default Menu