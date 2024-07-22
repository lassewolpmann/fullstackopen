import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('<Blog />', () => {
    let container

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

        container = render(<Blog blog={blog} user={user} />).container
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
        const user = userEvent.setup()
        const button = container.querySelector('.blogDetailsButton')
        await user.click(button)

        const urlEl = container.querySelector('.blogURL')
        const likesEl = container.querySelector('.blogLikes')
        const userEl = container.querySelector('.blogUser')

        expect(urlEl).toBeInTheDocument()
        expect(likesEl).toBeInTheDocument()
        expect(userEl).toBeInTheDocument()
    })
})