import {test, expect} from '@playwright/test'



test.describe('Hooks in playwright', async()=> {


    test.beforeAll(()=> {
        console.log("before all executed")
    })

    test.beforeEach(()=> {
        console.log("before each executed")
    })

    test.afterAll(()=> {
        console.log("After all executed")
    })

    test.afterEach(()=> {
        console.log("After Each executed")
    })


    test('test case 1', ()=> {
        console.log('Test case 1 Executed')
    })

    test('Test case 2', ()=> {
        console.log("test case 2 executed");
        
    })






})