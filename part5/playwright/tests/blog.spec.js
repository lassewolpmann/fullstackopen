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
            await page.getByPlaceholder('write blog title here').fill('test title')
            await page.getByPlaceholder('write blog author here').fill('test author')
            await page.getByPlaceholder('write blog url here').fill('localhost:5173/')
            await page.getByRole('button', { name: 'create' }).click()
        })

        test('a new blog can be created', async ({ page }) => {
            const successDiv = await page.locator('.success')
            await expect(successDiv).toContainText('Added new blog: test title by test author')

            const blogDiv = await page.getByTestId('test title')
            await expect(blogDiv).toBeVisible()
        })

        test('a blog can be liked', async ({ page }) => {
            await page.getByRole('button', { name: 'show' }).click()
            const likes = await page.locator('.blogLikes')
            await expect(likes).toContainText('likes 0')

            await page.getByRole('button', { name: 'like' }).click()
            await expect(likes).toContainText('likes 1')
        })

        test('a blog can be deleted by the user who added the blog', async ({ page }) => {
            page.on('dialog', dialog => dialog.accept())
            await page.getByRole('button', { name: 'delete' }).click()

            const successDiv = await page.locator('.success')
            await expect(successDiv).toContainText('Removed blog: test title by test author')
        })

        test('login with different user to ensure delete button is only visible for user who created the blog', async ({ page }) => {
            await page.getByRole('button', { name: 'logout' }).click()
            const successDiv = await page.locator('.success')
            await expect(successDiv).toContainText('Logged out')

            await page.getByTestId('username').fill('testUser2')
            await page.getByTestId('password').fill('testPassword')
            await page.getByRole('button', { name: 'login' }).click()
            await expect(page.getByText('Test User 2 logged in')).toBeVisible()

            await expect(page.getByRole('button', { name: 'delete' })).not.toBeVisible()
        })
    })
})