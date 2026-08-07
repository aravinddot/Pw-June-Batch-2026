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


    test('Handling Iframe', async({page})=> {


        await page.goto('https://playwright-mastery-academy-app.vercel.app/practice/sandbox-advanced')

        const iframe = await page.frameLocator('#practice-iframe')

        await iframe.locator('#frame-input').fill('Playwright')

        await iframe.locator('#frame-save').click()

        await expect(iframe.getByText('playwright saved')).toBeVisible()

    })


    test('Handling shadow dom', async({page})=> {

        await page.goto('https://playwright-mastery-academy-app.vercel.app/practice/sandbox-advanced')

        const shadow = await page.getByTestId('shadow-host')

        await shadow.locator('#shadow-input').fill('Automation Testing')

        await shadow.locator('#shadow-save').click()

        await expect(shadow.getByText('Automation Testing saved')).toBeVisible()

    })


    test('Handling Date picker', async({page})=> {

        await page.goto('https://playwright-mastery-academy-app.vercel.app/practice/sandbox-advanced')

        // await page.getByTestId('practice-date-picker').type('01-11-1998')

        // await expect(page.getByText('Practice Date Selected: 1998-11-01')).toBeVisible()


        await page.getByTestId('practice-date-picker').fill('1998-11-01')

        await expect(page.getByText('Practice Date Selected: 1998-11-01')).toBeVisible()

    })


    test('Handling date picker using DOM manipulation', async({page})=> {

        await page.goto('https://playwright-mastery-academy-app.vercel.app/practice/sandbox-advanced')

        const date = await page.getByTestId('interview-date-picker')

        await date.evaluate((dom, val)=> {

            const html = dom as HTMLInputElement
            html.value = val as string

            html.dispatchEvent(new Event('input'))
            html.dispatchEvent(new Event('change'))

        }, '1998-11-01')

        await expect(page.getByText('Interview Date Selected: 1998-11-01')).toBeVisible()
        
    })


    test('Advanced Wait commands', async({page})=> {

        await page.goto('https://playwright-mastery-academy-app.vercel.app/practice/sandbox-advanced')

        // await page.getByTestId('wait-navigation-link').click()

        // await page.waitForURL('https://playwright-mastery-academy-app.vercel.app/practice/popup?source=waitfornavigation')

        // await expect(page.getByText('Popup Opened Successfully')).toBeVisible()

        // await page.getByTestId('wait-response-btn').click()

        // await page.waitForResponse('https://playwright-mastery-academy-app.vercel.app/api/practice/waits-status')

        // await expect(page.getByText('API Response Completed')).toBeVisible()

        // attached - locator exists in DOM
        // detached - locator does not exist in DOM and should not be visible
        // visible - locator exists in DOM and should be visible
        // hidden - locator exist in DOM or is not visible

        // await page.getByTestId('wait-response-btn').click()

        // await page.getByText('API Response Completed').waitFor({state: 'detached'})

        // await expect(page.getByText('API Response Completed')).toBeVisible()

        // await page.getByTestId('wait-response-btn').click()

        // await page.waitForSelector("//*[contains(text(), 'Trigger API Response Completed')]")

        // await expect(page.getByText('API Response Completed')).toBeVisible()

        // load - DOM ready, images loaded, speed - medium
        // await page.getByTestId('wait-loadstate-practice-load-btn').click()

        // await page.waitForLoadState('load')

        // await expect(page.getByText('Test load State: Completed')).toBeVisible()


        // domcontentloaded - DOM ready, speed - fast
        // await page.getByTestId('wait-loadstate-practice-dom-btn').click()
        
        // await page.waitForLoadState('domcontentloaded')

        // await expect(page.getByText('Test DOMContentLoaded State: Completed')).toBeVisible()

        // networkidle - DOM ready, images loaded, api calls completed, speed - slow
        // await page.getByTestId('wait-loadstate-practice-networkidle-btn').click()
        
        // await page.waitForLoadState('networkidle')

        // await expect(page.getByText('Test Network Idle State: Completed')).toBeVisible()

    })


    test('Mouse actions', async({page})=> {

        await page.goto('https://playwright-mastery-academy-app.vercel.app/practice/sandbox-advanced')

        //await page.getByTestId('mouse-downup-target').hover()

        // await page.mouse.down()

        // await expect(page.getByText('Mouse down detected.')).toBeVisible()

        // await page.mouse.up()

        // await expect(page.getByText('Mouse down + up detected.')).toBeVisible()

        // await page.getByTestId('mouse-rightclick-target').click({button: 'right'})

        // await expect(page.getByText('Right click detected on target.')).toBeVisible()

        // await page.getByTestId('mouse-wheel-target').hover()

        // await page.mouse.wheel(0, 300)

        // await expect(page.getByText('Mouse wheel scrolled down.')).toBeVisible()

       // await page.getByTestId('mouse-wheel-target').scrollIntoViewIfNeeded()

    })


    test('force actions', async({page})=> {

        // click, dblclick, hover, check, uncheck, dragTo

        await page.getByTestId('mouse-wheel-target').click({force: true})


        //attached to the DOM
        // visible
        // enabled
        // stable
        // not covered by another element


        // avoid using force
        // clicking wronng element unintentionally



    })



    test('element screenshot and page screenshot', async({page})=> {

        await page.goto('https://playwright-mastery-academy-app.vercel.app/practice/sandbox-advanced')

        await page.getByTestId('wait-response-btn').screenshot({path: 'screenshots/element-screenshot.png'})


        await page.screenshot({path: 'screenshots/page-screenshot.png', fullPage: true})
        
    })






    test('retry, non retry, negating', async({page})=> {


        // retry assertions - 5 secs
        
        // visibility & state
        
        // expect(page.getByText('Mouse wheel scrolled down.')).toBeVisible()
        // expect(page.getByText('Mouse wheel scrolled down.')).toBeHidden()
        // expect(page.getByText('Mouse wheel scrolled down.')).toBeEnabled()
        // expect(page.getByText('Mouse wheel scrolled down.')).toBeDisabled()
        // expect(page.getByText('Mouse wheel scrolled down.')).toBeEditable()
        // expect(page.getByText('Mouse wheel scrolled down.')).toBeChecked()
        // expect(page.getByText('Mouse wheel scrolled down.')).toBeFocused()


        // // text 

        // expect(page.getByText('Mouse wheel scrolled down.')).toHaveText('Mouse wheel scrolled down.')
        // expect(page.getByText('Mouse wheel scrolled down.')).toContainText('Mouse wheel scrolled down.')
        // expect(page.getByText('Mouse wheel scrolled down.')).toHaveValue('Mouse wheel scrolled down.')
        // expect(page.getByText('Mouse wheel scrolled down.')).toHaveAttribute('href', '//https://playwright.dev/docs/api/class-locator#locator-getbytext')
        // expect(page.getByText('Mouse wheel scrolled down.')).toHaveClass('active')


        // // page

        // expect(page).toHaveTitle('Playwright')
        // expect(page).toHaveURL('https://playwright-mastery-academy-app.vercel.app/practice/sandbox-advanced')


        // non retry assertions - 0 secs


        const num = 5

        expect(num).toBe(5)
        expect(num).toEqual(5)
        expect(num).toStrictEqual(5)
        expect(num).toBeGreaterThan(4)
        expect(num).toBeLessThan(6)

        expect(true).toBeTruthy()
        expect(false).toBeFalsy()

        expect(null).toBeNull()
        expect(undefined).toBeUndefined()
        expect('Playwright').toBeDefined()

        expect(10).toContain([10, 20, 30])



        // negating assertions



        expect(num).not.toBe(6)
        expect(page.getByText('Mouse wheel scrolled down.')).not.toBeVisible()

    })



    test('Hard vs soft assertions', async({page})=> {

         await page.goto('https://playwright-mastery-academy-app.vercel.app/practice/sandbox-basic')

        await page.getByTestId('single-click-btn').click()

        await expect(page.getByText('Single click completed')).toBeVisible()

        await expect.soft(page.getByTestId('single-click-status')).toContainText('Single click completed playwright')



        await page.getByTestId('double-click-btn').dblclick()

        await expect(page.getByText('Double click completed.')).toBeVisible()


        await page.getByTestId('hover-btn').hover()

        await expect(page.getByText('Hover triggered successfully.')).toBeVisible()



        await page.getByTestId('tooltip-trigger-btn').hover()

        await expect(page.getByTestId('hover-tooltip')).toContainText('Tooltip verified')

        await expect(page.getByText('Tooltip verified successfully.')).toBeVisible()


        await page.getByTestId('static-practice-select').selectOption('Easy - Basic locator targeting')

        await expect(page.getByText('Static dropdown selected: Easy.')).toBeVisible()





    })




})