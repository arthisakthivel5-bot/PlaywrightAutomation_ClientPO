require("dotenv").config();
const {expect} = require("@playwright/test")

async function loginHub(page) {

    await page.goto(process.env.BASE_URL);
    await page.getByPlaceholder("you@email.com").fill("arthi@gmail.com");
    await page.getByLabel("Password").fill("Arthi@1995");
    await page.locator("#login-btn").click();
    await expect(page.getByRole('link', { name: 'Browse Events →' })).toBeVisible();
    
}

module.exports = {loginHub};