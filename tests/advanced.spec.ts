import {test, expect, chromium} from '@playwright/test'


test.describe('Advanced Practice', async()=> {


    test('Dynamic Dropdown Handling', async({page})=> {

        await page.goto('https://playwright-mastery-academy-app.vercel.app/practice/sandbox-advanced')

        await page.getByTestId('dynamic-group-select').selectOption('Locators')

        await page.getByTestId('dynamic-option-select').selectOption('getByRole + name')


        await expect(page.getByText('Dynamic dropdown selected: getByRole + name.')).toBeVisible()

    })


    test('Hidden Dropdown handling', async({page})=> {

        await page.goto('https://playwright-mastery-academy-app.vercel.app/practice/sandbox-advanced')

        const isVisible = await page.getByTestId('hidden-dropdown-select').isVisible()

        if(isVisible === false) {
            await page.getByTestId('hidden-dropdown-toggle-btn').click()
        }

        const dropdownVisible = await page.getByTestId('hidden-dropdown-select').isVisible()

        if(dropdownVisible) {
            await page.getByTestId('hidden-dropdown-select').selectOption('Hidden - Core')
        }

        await expect(page.getByText('Hidden dropdown selected: Hidden - Core.')).toBeVisible()


    })




    test('Bootstrap Dropdown Practice', async({page})=> {

         await page.goto('https://playwright-mastery-academy-app.vercel.app/practice/sandbox-advanced')

         await page.getByTestId('bootstrap-dropdown-trigger').click()

         await page.getByText('Weekday Batch').click()

         await expect(page.getByText('Bootstrap dropdown selected: Weekday Batch.')).toBeVisible()


    })


    test('Handling alert popup', async({page})=> {

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




    test('handling New Tab', async()=> {

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







})