import {test, expect} from '@playwright/test'


test.describe("Sandbox Basic Test cases", async()=> {


    test('Handling Click, Double Click, Hover, Tooltip, Static Dropdown', async({page})=> {

        await page.goto('https://playwright-mastery-academy-app.vercel.app/practice/sandbox-basic')

        await page.getByTestId('single-click-btn').click()

        await expect(page.getByText('Single click completed')).toBeVisible()

        await expect(page.getByTestId('single-click-status')).toContainText('Single click completed')



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




    test('Handling Inputs, Checkbox, Radio, Dropdown', async({page})=> {

        await page.goto('https://playwright-mastery-academy-app.vercel.app/practice/sandbox-basic')

        const name = 'Playwright'
        const email = 'info@gmail.com'
        const value = 'Playwright Core'

        await page.getByTestId('name-input').fill(name)

        await page.getByTestId('email-input').type(email)

        await page.getByTestId('track-select').selectOption(value)

        await page.getByTestId('remember-checkbox').check()

        await page.getByTestId('mode-api-radio').check()

        await page.getByTestId('submit-form-btn').click()

        await expect(page.getByText(`${name} submitted (${email}) for ${value}.`)).toBeVisible()


    })


    test('Handling Static Waits, Keyboard', async({page})=> {

        await page.goto('https://playwright-mastery-academy-app.vercel.app/practice/sandbox-basic')

        // await page.getByTestId('async-load-btn').click()

        // await page.waitForTimeout(20000)

        // await expect(page.getByText('Async result loaded successfully.')).toBeVisible()


        await page.getByTestId('keyboard-input').fill('Playwright')

        await page.getByTestId('keyboard-input').press('Enter')

        await expect(page.getByText('Command submitted: Playwright')).toBeVisible()

        // Tab, Escape, Backspace, Delete, ArrowUp, ArrowDown, ArrowRight, ArrowLeft, Space,

        // A to Z, 1 to 0

        // Control+C, Control+V, Control+A
    })


    test('Handling Text and Attribute Extraction', async({page})=> {

        await page.goto('https://playwright-mastery-academy-app.vercel.app/practice/sandbox-basic')

        const innerText = await page.getByTestId('extract-textcontent-target').innerText()

        console.log("innerText==>"+ innerText);

        const textContent = await page.getByTestId('extract-textcontent-target').textContent()

        console.log("textContent==>"+ textContent);


        const inputValue = await page.getByTestId('extract-inputvalue-target').inputValue()

        console.log("inputValue==>"+ inputValue);


        const getAttribute = await page.getByTestId('extract-attribute-target').getAttribute('class')

        console.log("getAttribute===>"+ getAttribute);


        const allInnerTexts =  await page.getByTestId('extract-list').allInnerTexts()

        console.log("allInnerTexts==>"+ allInnerTexts);


        const allTextContents =  await page.getByTestId('extract-list').allTextContents()

        console.log("allTextContents==>"+ allTextContents);


        const innerHTML =  await page.getByTestId('extract-list').innerHTML()

        console.log("innerHTML==>"+ innerHTML);

    })


    test('Conditional Handling - is checked, is editable', async({page})=> {

        await page.goto('https://playwright-mastery-academy-app.vercel.app/practice/sandbox-basic')

         await page.getByTestId('remember-checkbox').check()

        const isChecked =  await page.getByTestId('remember-checkbox').isChecked()

        if(isChecked === false) {
            await page.getByTestId('remember-checkbox').check()
        }


        const isEditable = await page.getByTestId('name-input').isEditable()
        
        console.log(isEditable);


    })



    test('Conditional Handling - isVisible, isHidden, isDisabled', async({page})=> {


        await page.goto('https://playwright-mastery-academy-app.vercel.app/practice/sandbox-advanced')


        const isDisabled = await page.getByTestId('dynamic-option-select').isDisabled()

        console.log(isDisabled);


        const isHidden = await page.getByTestId('hidden-dropdown-select').isHidden()
        
        console.log(isHidden);


        const isVisible = await page.getByTestId('dynamic-group-select').isVisible()

        console.log(isVisible);
        
        

    })


})