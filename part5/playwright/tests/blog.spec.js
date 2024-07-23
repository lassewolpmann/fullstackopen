const { test, expect, beforeEach, describe } = require('@playwright/test')

describe('Blog app', () => {
    beforeEach(async ({ page, request }) => {
        await request.post('http:localhost:3003/api/testing/reset')
        await request.post('http://localhost:3003/api/users', {
            data: {
                username: 'testUser',
                password: 'testPassword',
                name: 'Test User'
            }
        })
        await request.post('http://localhost:3003/api/users', {
            data: {
                username: 'testUser2',
                password: 'testPassword',
                name: 'Test User 2'
            }
        })

        await page.goto('http://localhost:5173')
    })

    test('Login form is shown', async ({ page }) => {
        const locator = await page.getByText('Log in to application')
        await expect(locator).toBeVisible()
    })

    describe('Login', () => {
        test('succeeds with correct credentials', async ({ page }) => {
            await page.getByTestId('username').fill('testUser')
            await page.getByTestId('password').fill('testPassword')
            await page.getByRole('button', { name: 'login' }).click()

            await expect(page.getByText('Test User logged in')).toBeVisible()
        })

        test('fails with wrong credentials', async ({ page }) => {
            await page.getByRole('button', { name: 'login' }).click()
            await page.getByTestId('username').fill('wrongUser')
            await page.getByTestId('password').fill('wrongPassword')
            await page.getByRole('button', { name: 'login' }).click()

            const errorDiv = await page.locator('.error')
            await expect(errorDiv).toContainText('Wrong credentials')
        })
    })

    describe('When logged in', () => {
        beforeEach(async ({ page }) => {
            await page.getByTestId('username').fill('testUser')
            await page.getByTestId('password').fill('testPassword')
            await page.getByRole('button', { name: 'login' }).click()

            await page.getByRole('button', { name: 'new blog post' }).click()
            await page.getByPlaceholder('write blog title here').fill('test title 1')
            await page.getByPlaceholder('write blog author here').fill('test author 1')
            await page.getByPlaceholder('write blog url here').fill('localhost:5173/')
            await page.getByRole('button', { name: 'create' }).click()
        })

        test('a new blog can be created', async ({ page }) => {
            const successDiv = await page.locator('.success')
            await expect(successDiv).toContainText('Added new blog: test title 1 by test author 1')

            const blogDiv = await page.getByTestId('test title 1')
            await expect(blogDiv).toBeVisible()
        })

        test('a blog can be liked', async ({ page }) => {
            const blogDiv = await page.getByTestId('test title 1')

            await blogDiv.getByRole('button', { name: 'show' }).click()
            const likes = await blogDiv.locator('.blogLikes')
            await expect(likes).toContainText('likes 0')

            await blogDiv.getByRole('button', { name: 'like' }).click()
            await expect(likes).toContainText('likes 1')
        })

        test('a blog can be deleted by the user who added the blog', async ({ page }) => {
            page.on('dialog', dialog => dialog.accept())
            const blogDiv = await page.getByTestId('test title 1')

            await blogDiv.getByRole('button', { name: 'delete' }).click()

            const successDiv = await page.locator('.success')
            await expect(successDiv).toContainText('Removed blog: test title 1 by test author 1')
        })

        test('login with different user to ensure delete button is only visible for user who created the blog', async ({ page }) => {
            await page.getByRole('button', { name: 'logout' }).click()
            const successDiv = await page.locator('.success')
            await expect(successDiv).toContainText('Logged out')

            await page.getByTestId('username').fill('testUser2')
            await page.getByTestId('password').fill('testPassword')
            await page.getByRole('button', { name: 'login' }).click()
            await expect(page.getByText('Test User 2 logged in')).toBeVisible()

            const blogDiv = await page.getByTestId('test title 1')
            await expect(blogDiv.getByRole('button', { name: 'delete' })).not.toBeVisible()
        })

        test('blogs are sorted by likes in descending order', async ({ page }) => {
            const firstBlogDiv = await page.getByTestId('test title 1')
            await expect(firstBlogDiv).toBeVisible()

            await firstBlogDiv.getByRole('button', { name: 'show' }).click()
            await firstBlogDiv.getByRole('button', { name: 'like' }).click()

            // Create second blog
            await page.getByRole('button', { name: 'new blog post' }).click()
            await page.getByPlaceholder('write blog title here').fill('test title 2')
            await page.getByPlaceholder('write blog author here').fill('test author 2')
            await page.getByPlaceholder('write blog url here').fill('localhost:5173/')
            await page.getByRole('button', { name: 'create' }).click()
            const secondBlogDiv = await page.getByTestId('test title 2')
            await expect(secondBlogDiv).toBeVisible()
            await secondBlogDiv.getByRole('button', { name: 'show' }).click()

            let blogDivs = await page.locator('.blog').all()
            await expect(blogDivs).toHaveLength(2)

            // At this point, blog "test title 1" has more likes than "test title 2" and therefore should come first
            await expect(blogDivs[0]).toContainText('test title 1')
            await expect(blogDivs[1]).toContainText('test title 2')

            const secondBlogLikes = await secondBlogDiv.locator('.blogLikes')
            await secondBlogDiv.getByRole('button', { name: 'like' }).click()
            await expect(secondBlogLikes).toContainText('likes 1')
            await secondBlogDiv.getByRole('button', { name: 'like' }).click()
            await expect(secondBlogLikes).toContainText('likes 2')

            blogDivs = await page.locator('.blog').all()
            await expect(blogDivs).toHaveLength(2)

            // Now "test title 2" should have two likes, which is more than "test title 1" has.
            // Therefore, "test title 2" should now come first
            await expect(blogDivs[0]).toContainText('test title 2')
            await expect(blogDivs[1]).toContainText('test title 1')
        })
    })
})