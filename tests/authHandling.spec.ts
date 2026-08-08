import { test, expect, Page, Browser, BrowserContext, chromium } from '@playwright/test'


test.describe("Authetication Handling", async () => {

    let browser: Browser
    let context: BrowserContext
    let page: Page


    test.beforeAll(async () => {
        browser = await chromium.launch()
        context = await browser.newContext()
        page = await context.newPage()
        await page.goto('https://testcms.reco-claims.ca/Login')
        await page.getByRole('textbox', { name: 'Username' }).fill('info+programmanager@xlgclaims.com')
        await page.getByRole('textbox', { name: 'Password' }).fill('Test1234!')
        await page.getByRole('button', { name: 'Login' }).click()
        await page.waitForTimeout(15000)
        await context.storageState({path: 'storageState.json'})
        await browser.close()
    })

    test.beforeEach(async () => {
        browser = await chromium.launch()
        context = await browser.newContext({storageState: 'storageState.json'})
        page = await context.newPage()
        await page.goto('https://testcms.reco-claims.ca/')
        
    })

    test.afterEach(async () => {
       await browser.close()
    })




    test('Verify Serach button is visible', async () => {
        test.setTimeout(120000)
        await page.waitForTimeout(10000)
        await expect(page.getByPlaceholder('Search')).toBeVisible()
    })


    test('Verify the Header is visible', async () => {
        test.setTimeout(120000)
        await page.waitForTimeout(10000)
        await expect(page.locator('thead')).toBeVisible()
    })

    test('Verify the buttons are visible', async()=> {
        test.setTimeout(120000)
        await page.waitForTimeout(15000)
        await expect(page.getByRole('button').getByText('New Claim')).toBeVisible()
    })









})