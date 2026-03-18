require("dotenv").config();
const { expect } = require("@playwright/test")

async function loginHub(page) {

    await page.goto(process.env.BASE_URL);
    await page.getByPlaceholder("you@email.com").fill(process.env.USERNAME);
    await page.getByLabel("Password").fill(process.env.PASSWORD);
    await page.locator("#login-btn").click();
    await expect(page.getByRole('link', { name: 'Browse Events →' })).toBeVisible();

}

module.exports = { loginHub };