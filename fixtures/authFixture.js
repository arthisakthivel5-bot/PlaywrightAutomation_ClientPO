const base = require("@playwright/test");
//const { request } = require('@playwright/test');
const {getToken} = require("../utils/auth");

exports.test = base.test.extend({

    authenticatedPage: async({page,request},use) =>{

        const token = await getToken(request);
        await page.addInitScript(value => {
            window.localStorage.setItem("token",value)

        },token)
        await page.goto(`${process.env.BASE_URL_CLIENT}/client/#/dashboard/dash`)

        await use(page);   
    },
    authenticatedAPI: async({request},use) =>{

        const token = await getToken(request);
        const apiContext = await request.newContext({

            extraHTTPHeaders:{
                Authorization: `Bearer ${token}`
            }
        });
        await use(apiContext)

    }
});