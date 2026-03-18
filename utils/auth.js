require("dotenv").config();
const { expect } = require("@playwright/test");
async function getToken(request) {

    const response = await request.post(`${process.env.BASE_URL}/api/ecom/auth/login`, {
        data:
        {
            userEmail: process.env.USERNAME,
            userPassword: process.env.PASSWORD
        }
    })
    expect(response.status()).toBe(200);
    const responseJSON = await response.json();
    return responseJSON.token;
    
}
module.exports = {getToken};