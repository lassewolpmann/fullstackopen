import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import NewBlogForm from "./NewBlogForm.jsx";

describe('<Blog />', () => {
    let container

    const likeBlogPost = vi.fn()
    const user = userEvent.setup()

    beforeEach(() => {
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

        container = render(<Blog blog={blog} user={user} likeBlogPost={likeBlogPost} />).container
    })

    test('renders title and author only', () => {
        const titleEl = container.querySelector('.blogTitle')
        const authorEl = container.querySelector('.blogAuthor')
        const urlEl = container.querySelector('.blogURL')
        const likesEl = container.querySelector('.blogLikes')
        const userEl = container.querySelector('.blogUser')

        expect(titleEl).toBeInTheDocument()
        expect(authorEl).toBeInTheDocument()
        expect(urlEl).not.toBeInTheDocument()
        expect(likesEl).not.toBeInTheDocument()
        expect(userEl).not.toBeInTheDocument()
    })

    test('show details on button click', async () => {
        const button = container.querySelector('.blogDetailsButton')
        await user.click(button)

        const urlEl = container.querySelector('.blogURL')
        const likesEl = container.querySelector('.blogLikes')
        const userEl = container.querySelector('.blogUser')

        expect(urlEl).toBeInTheDocument()
        expect(likesEl).toBeInTheDocument()
        expect(userEl).toBeInTheDocument()
    })

    test('pressing like button twice should call event handler twice', async () => {
        const detailsButton = container.querySelector('.blogDetailsButton')
        await user.click(detailsButton)

        const likeButton = container.querySelector('.blogLikeButton')
        await user.click(likeButton)
        await user.click(likeButton)

        expect(likeBlogPost.mock.calls).toHaveLength(2)
    })
})

describe('<NewBlogForm />', () => {
    let container

    const newBlog = vi.fn()
    const user = userEvent.setup()

    beforeEach(() => {
        container = render(<NewBlogForm newBlog={newBlog} />).container
    })

    test('submitting form succeeds with correct prop details', async () => {
        const titleInput = screen.getByPlaceholderText('write blog title here')
        const authorInput = screen.getByPlaceholderText('write blog author here')
        const urlInput = screen.getByPlaceholderText('write blog url here')

        const sendButton = screen.getByText('create')

        await user.type(titleInput, 'test title input...')
        await user.type(authorInput, 'test author input...')
        await user.type(urlInput, 'test url input...')

        await user.click(sendButton)

        expect(newBlog.mock.calls).toHaveLength(1)
        expect(newBlog.mock.calls[0][0].title).toBe('test title input...')
        expect(newBlog.mock.calls[0][0].author).toBe('test author input...')
        expect(newBlog.mock.calls[0][0].url).toBe('test url input...')
    })
})