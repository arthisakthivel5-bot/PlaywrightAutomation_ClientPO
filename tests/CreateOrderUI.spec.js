
const { test } = require("../fixtures/authFixture");
const { expect } = require("@playwright/test");
const productname = "iphone 13 pro";
const country = "India"
const name = "Anish"
const couponcode = "rahulshettyacademy"

test('@Web Verify Order thru UI', async ({ authenticatedPage }) => {
 
  
  /** @type {import('@playwright/test').Page} */
  const page = authenticatedPage;
  await expect(page.locator("[routerlink='/dashboard']")).toBeVisible();
  await page.locator(".card-body").filter({hasText:productname}).getByRole("button",{name:"Add To Cart"}).click();
  await expect(page.locator(".toast-container")).toContainText("Product Added To Cart");
  await page.getByRole("listitem").getByRole("button",{name:"Cart"}).click();
  await expect(page.getByRole('heading', { name:productname})).toBeVisible();
  await page.getByRole("button",{name:"Checkout"}).click();
  await page.locator(".field").filter({hasText:"Name on Card"}).getByRole("textbox").fill(name);
  await page.locator(".field").filter({hasText:"Apply Coupon"}).getByRole("textbox").fill(couponcode);
  await page.getByRole("button",{name:"Apply Coupon"}).click();
  await expect(page.getByText("* Coupon Applied")).toBeVisible();
  await page.getByPlaceholder("Select Country").pressSequentially("Ind");
  await page.locator(".ta-results").getByText(country,{exact:true}).click();
  await page.locator(".btnn").click();
  await expect(page.getByText("Thankyou for the order")).toBeVisible();
  const OrderDetails = await page.locator("label.ng-star-inserted").textContent();
  const OrderID = OrderDetails.replace(/\|/g, "").trim();
  console.log(OrderID)
  await page.getByRole("button",{name:"ORDERS"}).click();
  await page.locator("tbody").waitFor();
  const row = page.locator("table tbody tr").filter({ hasText: OrderID });
  await expect(row).toBeVisible();
  await row.getByRole("button", { name: "View" }).click();
  await expect(page.getByText(OrderID)).toBeVisible();




});


