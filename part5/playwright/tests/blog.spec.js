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
        })

        test('a new blog can be created', async ({ page }) => {
            await page.getByRole('button', { name: 'new blog post' }).click()
            await page.getByPlaceholder('write blog title here').fill('test title')
            await page.getByPlaceholder('write blog author here').fill('test author')
            await page.getByPlaceholder('write blog url here').fill('localhost:5173/')
            await page.getByRole('button', { name: 'create' }).click()

            const successDiv = await page.locator('.success')
            await expect(successDiv).toContainText('Added new blog: test title by test author')

            const blogDiv = await page.getByTestId('test title')
            await expect(blogDiv).toBeVisible()
        })
    })
})