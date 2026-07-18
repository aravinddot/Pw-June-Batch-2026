import {test, expect} from '@playwright/test'


// test('Basic test cases', async({page}) => {

//     await page.goto('https://playwright-mastery-academy-app.vercel.app/practice/sandbox-basic')

//     await page.locator('[data-testid="single-click-btn"]').click()

//     await expect(page.getByText('Single click completed.')).toBeVisible()

//     await page.waitForTimeout(10000)

// })


test('Chaining locators', async({page})=> {

    await page.goto('https://playwright-mastery-academy-app.vercel.app/practice/table-pagination')

    // const chain = await page.locator('tbody tr').first().getByText('aa').getByRole('button').getByPlaceholder('bb')

    // console.log(chain);


    const filter = await page.locator('tbody tr td').filter({hasText: 'BDD Framework'}).allInnerTexts()

    console.log(filter);
    
    




})
