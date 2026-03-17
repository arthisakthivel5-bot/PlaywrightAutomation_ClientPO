const {test} = require("@playwright/test");
const {PageObjectManager} = require("../page/PageObjectManager")
require("dotenv").config();
const {loginHub} = require("../utils/loginHelper")
const {generateEventData} = require("../test-data/createEventData")
const { users,ticketData} = require("../test-data/bookingData.json");



test("Create a brand new event from the admin panel and verify the seat count",async({page})=> {
    
    //Login
    await loginHub(page);
    const pom = new PageObjectManager(page);

    const createEventpage = pom.getCreateEventPage();
    const upcomingEventsPage = pom.getUpcomingEventsPage();
    const myBookingdetails = pom.getMyBookingsPage();

    //AddEvent
    const eventData = await generateEventData();
    await createEventpage.createEvent(eventData);
    
    //Find the event card and capture seats
    const seatsBeforeBooking = await upcomingEventsPage.getMyEventCard(eventData);
    

    //Fill Booking form
    await upcomingEventsPage.bookMyEventCard(users[0],ticketData.defaultCount);
    
    //Verify booking confirmation
    const bookingRef = await upcomingEventsPage.verifyConfirmation();

    //Verify booking in My Bookings
    await myBookingdetails.verifyMyBooking(bookingRef, eventData);

    //Verify seat reduction
    await myBookingdetails.verifyMyeventseats(eventData,seatsBeforeBooking);

})