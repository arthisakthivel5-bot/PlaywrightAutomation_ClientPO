const { test } = require("@playwright/test");
const { PageObjectManager } = require("../page/PageObjectManager")
require("dotenv").config();
const { loginHub } = require("../utils/loginHelper")
const { users, ticketData } = require("../test-data/bookingData.json")

test("@Web Single ticket booking is eligible for refund", async ({ page }) => {

    await loginHub(page)
    const pom = new PageObjectManager(page);
    const upcomingEventsPage = pom.getUpcomingEventsPage();
    const myBookingdetails = pom.getMyBookingsPage();

    //Book first event with 1 ticket (default)
    await upcomingEventsPage.bookNowFilter();
    await upcomingEventsPage.bookMyEventCard(users[1], ticketData.currentCount);

    //Navigate to booking detail
    await myBookingdetails.verifyEventDetails();

    //Check refund eligibility
    await myBookingdetails.checkRefundEligibility();

})
test("@Web Group ticket booking is NOT eligible for refund", async ({ page }) => {

    await loginHub(page)
    const pom = new PageObjectManager(page);
    const upcomingEventsPage = pom.getUpcomingEventsPage();
    const myBookingdetails = pom.getMyBookingsPage();

    //Book first event with 1 ticket (default)
    await upcomingEventsPage.bookNowFilter();

    await upcomingEventsPage.addMorethanoneticket(ticketData.targetCount);

    //Fill Booking form
    await upcomingEventsPage.bookMyEventCard(users[2], ticketData.targetCount);

    //Navigate to booking detail
    await myBookingdetails.verifyEventDetails();

    //Check refund eligibility
    await myBookingdetails.checkRefundEligibility();

})