const {test} = require("@playwright/test");

test("testing", async({browser})=>{

const context1 = await browser.newContext();
const context2 = await browser.newContext()
const page1 = await context1.newPage();
const page2 = await context2.newPage()
await page1.goto("url1");
await page2.goto("url2");

page1.once("dialog", async dialog =>{await dialog.accept()})

})