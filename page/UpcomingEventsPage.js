const { expect } = require("@playwright/test")
class UpcomingEventsPage {

    constructor(page) {
        this.page = page;
        this.events = page.getByTestId("nav-events");
        this.eventCards = page.getByTestId("event-card");
        this.fullname = page.getByLabel("Full Name");
        this.email = page.locator("#customer-email");
        this.phoneNo = page.getByPlaceholder("+91 98765 43210");
        this.confirmbtn = page.locator(".confirm-booking-btn");
        this.bookingRef = page.locator(".booking-ref");
        this.increasebtn = page.getByRole('button', { name: '+' });
    }

    async getMyEventCard(eventData) {

        await this.events.click();
        await expect((this.eventCards).first()).toBeVisible();
        const myCard = this.eventCards.filter({ hasText: eventData.title });
        await expect(myCard).toBeVisible();
        const seatTextElement = myCard.getByText(/seat/i);
        const seats = await seatTextElement.innerText();
        const seatsBeforeBooking = parseInt((seats).match(/\d+/))
        await myCard.getByTestId('book-now-btn').click();
        return seatsBeforeBooking;

    }
    async bookNowFilter(){
        
        await this.page.getByTestId("event-card").first().getByTestId("book-now-btn").click();
    }

    async addMorethanoneticket(ticket){

        const currentCount = Number(await this.page.locator("#ticket-count").innerText());

        const increaseBtn = await this.increasebtn;
        for(let i=currentCount;i< ticket;i++){
            await increaseBtn.click();
        }
        
    }

    async bookMyEventCard(user,ticket) {

        await expect(this.page.locator("#ticket-count")).toContainText(String(ticket));
        await this.fullname.fill(user.fullname);
        await this.email.fill(user.email)
        await this.phoneNo.fill(user.phoneNo);
        await this.confirmbtn.click();

    }

    async verifyConfirmation() {

        const bookingReference = this.bookingRef.first();
        await expect(bookingReference).toBeVisible();
        const bookingReferenceNumber = await bookingReference.innerText();
        const bookingRef = bookingReferenceNumber.toString();
        return bookingRef;
    }



}

module.exports = { UpcomingEventsPage }