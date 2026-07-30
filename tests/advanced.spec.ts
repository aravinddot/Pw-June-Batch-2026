import { test, expect, chromium } from '@playwright/test'


test.describe('Advanced Practice', async () => {


    test('Dynamic Dropdown Handling', async ({ page }) => {

        await page.goto('https://playwright-mastery-academy-app.vercel.app/practice/sandbox-advanced')

        await page.getByTestId('dynamic-group-select').selectOption('Locators')

        await page.getByTestId('dynamic-option-select').selectOption('getByRole + name')


        await expect(page.getByText('Dynamic dropdown selected: getByRole + name.')).toBeVisible()

    })


    test('Hidden Dropdown handling', async ({ page }) => {

        await page.goto('https://playwright-mastery-academy-app.vercel.app/practice/sandbox-advanced')

        const isVisible = await page.getByTestId('hidden-dropdown-select').isVisible()

        if (isVisible === false) {
            await page.getByTestId('hidden-dropdown-toggle-btn').click()
        }

        const dropdownVisible = await page.getByTestId('hidden-dropdown-select').isVisible()

        if (dropdownVisible) {
            await page.getByTestId('hidden-dropdown-select').selectOption('Hidden - Core')
        }

        await expect(page.getByText('Hidden dropdown selected: Hidden - Core.')).toBeVisible()


    })




    test('Bootstrap Dropdown Practice', async ({ page }) => {

        await page.goto('https://playwright-mastery-academy-app.vercel.app/practice/sandbox-advanced')

        await page.getByTestId('bootstrap-dropdown-trigger').click()

        await page.getByText('Weekday Batch').click()

        await expect(page.getByText('Bootstrap dropdown selected: Weekday Batch.')).toBeVisible()


    })


    test('Handling alert popup', async ({ page }) => {

        await page.goto('https://playwright-mastery-academy-app.vercel.app/practice/sandbox-advanced')

        // page.on('dialog', async dialog => {
        //     console.log(dialog.message())
        //     await dialog.accept()
        // })

        // await page.getByTestId('alert-btn').click()

        // await expect(page.getByText('Alert handled.')).toBeVisible()



        //  page.on('dialog', async dialog => {
        //     console.log(dialog.message())
        //     await dialog.dismiss()
        // })

        // await page.getByTestId('confirm-btn').click()

        // await expect(page.getByText('Confirm dismissed.')).toBeVisible()




        page.on('dialog', async dialog => {
            console.log(dialog.message())
            await dialog.accept('Playwright')
        })

        await page.getByTestId('prompt-btn').click()

        await expect(page.getByText('Prompt value: Playwright')).toBeVisible()

    })




    test('handling New Tab', async () => {

        const browser = await chromium.launch()

        const context = await browser.newContext()

        const page = await context.newPage()

        await page.goto('https://playwright-mastery-academy-app.vercel.app/practice/sandbox-advanced')


        const [newPage] = await Promise.all([
            context.waitForEvent('page'),
            page.getByTestId('popup-link').click()
        ])

        await expect(newPage.getByText('Popup Opened Successfully')).toBeVisible()

        await newPage.waitForTimeout(5000)

        await page.bringToFront()

        await page.waitForTimeout(5000)

    })


    test('Handling new tab direct click blocked', async () => {

        const browser = await chromium.launch()

        const context = await browser.newContext()

        const page = await context.newPage()

        await page.goto('https://playwright-mastery-academy-app.vercel.app/practice/sandbox-advanced')


        await page.getByTestId('popup-right-click-link').click()

        await expect(page.getByText('Direct click blocked. Use right click -> Open link in new tab.')).toBeVisible()

        const link = await page.getByTestId('popup-right-click-link').getAttribute('href')

        console.log(link);

        const pageTwo = await context.newPage()

        await pageTwo.goto(`https://playwright-mastery-academy-app.vercel.app${link}`)

        await expect(pageTwo.getByText('Popup Opened Successfully')).toBeVisible()

    })





    test('Isolated context', async()=> {

        test.setTimeout(180000)

        const browser = await chromium.launch()

        const context = await browser.newContext()

        const page = await context.newPage()

        await page.goto('https://testcms.reco-claims.ca/Login')

        await page.locator('[name="Username"]').fill('info+programmanager@xlgclaims.com')

        await page.locator('[name="Password"]').fill('Test1234!')

        await page.getByRole('button', {name: 'Login'}).click()

        await page.waitForTimeout(15000)

//----------------------------------------------------------------------------------------

        const contextTwo = await browser.newContext()

        const pageTwo = await contextTwo.newPage()

         await pageTwo.goto('https://testcms.reco-claims.ca/Login')

        await pageTwo.locator('[name="Username"]').fill('info+programmanager@xlgclaims.com')

        await pageTwo.locator('[name="Password"]').fill('Test1234!')

        await pageTwo.getByRole('button', {name: 'Login'}).click()

        await pageTwo.waitForTimeout(15000)


        const cookie = await context.cookies()

        const cookieTwo = await contextTwo.cookies()

        console.log("cookie==>"+ JSON.stringify(cookie));
        
        console.log("cookieTwo===>"+ JSON.stringify(cookieTwo));
        


    })


    test('Handling Drag and drop', async({page})=> {


        await page.goto('https://playwright-mastery-academy-app.vercel.app/practice/sandbox-advanced')

        await page.getByTestId('drag-source').dragTo(page.getByTestId('drop-target'))

        await expect(page.getByText('Drop completed successfully.')).toBeVisible()

    })


    test('Uploads single and multiple files', async({page})=> {

        await page.goto('https://playwright-mastery-academy-app.vercel.app/practice/sandbox-advanced')

        await page.getByTestId('file-upload-input').setInputFiles('uploads/practice-data.csv')

        await expect(page.getByText('practice-data.csv uploaded successfully.')).toBeVisible()


        await page.getByTestId('multi-file-upload-input').setInputFiles(['uploads/practice-data.csv', 'uploads/practice-data.xml', 'uploads/practice-notes.txt'])

        await expect(page.getByText('3 files uploaded')).toBeVisible()

    })



    test('Handling downloads', async({page})=> {

        await page.goto('https://playwright-mastery-academy-app.vercel.app/practice/sandbox-advanced')

        const [download] = await Promise.all([
            page.waitForEvent('download'),
            page.getByTestId('download-pdf-btn').click()
        ])

        const fileName = await download.suggestedFilename()

        await download.saveAs(`downloads/${fileName}`)



    })









})