import { test, expect } from '@playwright/test'
import fs from 'fs'




test('Handling tables and pagination', async ({ page }) => {


    await page.goto('https://playwright-mastery-academy-app.vercel.app/practice/table-pagination')

    await expect(page.getByRole('heading', { name: 'Filter Controls' })).toBeVisible()

    await page.getByTestId('page-size-select').selectOption('100')

    const rowCount = await page.locator('tbody tr').count()

    console.log("rowCount==>" + rowCount);

    const pageCount = await page.getByTestId('pagination-current').textContent() || ""

    console.log("pageCount==>" + pageCount);

    const splittedValue = pageCount.split(' ')

    console.log("splittedValue==>" + splittedValue);

    const obj: {[key:string]: string[]} = {}

    for (let i = 1; i <= Number(splittedValue[3]); i++) {

        for(let j = 0; j < rowCount; j++) {
            
            const row = await page.locator('tbody tr').nth(j).locator('td').allTextContents()

            const objKey = row[0]

            obj[objKey] = row
        }


        if (i != Number(splittedValue[3])) {
            await page.getByTestId('pagination-next').click()
        }


    }

    fs.writeFileSync('tableAndPagination.json', JSON.stringify(obj))




// //LRN-0001,Learner 0001,QA Engineer,POM + OOPS,Completed,2 yrs,Deloitte,Kochi,Batch-2025-02,61,5.4


// const obj = {
//     "LRN-0001": [LRN-0001,Learner 0001,QA Engineer,POM + OOPS,Completed,2 yrs,Deloitte,Kochi,Batch-2025-02,61,5.4]
// }


})