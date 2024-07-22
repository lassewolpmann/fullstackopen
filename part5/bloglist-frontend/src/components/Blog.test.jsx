import { render, screen } from '@testing-library/react'
import Blog from './Blog'

test('renders title and author only', () => {
    const blog = {
        title: 'test blog',
        author: 'test author',
        url: 'testurl',
        likes: 10,
        user: {
            username: 'testUser'
        }
    }

    const user = {
        username: 'testUser'
    }

    render(<Blog blog={blog} user={user} />)

    const titleEl = screen.queryByTestId('blog-title')
    const authorEl = screen.queryByTestId('blog-author')
    const urlEl = screen.queryByTestId('blog-url')
    const likesEl = screen.queryByTestId('blog-likes')
    const userEl = screen.queryByTestId('blog-user')

    expect(titleEl).toBeInTheDocument()
    expect(authorEl).toBeInTheDocument()
    expect(urlEl).not.toBeInTheDocument()
    expect(likesEl).not.toBeInTheDocument()
    expect(userEl).not.toBeInTheDocument()
})