const { expect } = require("@playwright/test")

class MyBookingsPage {

    constructor(page) {
        this.page = page;
        this.viewmybooking = page.getByRole("link", { name: "View My Bookings" });
        this.myBooking = page.locator("#booking-card");
        this.eventCards = page.getByTestId("event-card");
        this.viewDetails = page.getByRole("link", { name: "View Details" });
        this.bookingInfo = page.getByText("Booking Information");
        this.bookingRef = page.locator(".font-mono.font-bold");
        this.titleInfo = page.locator("h1");
        this.checkRefund = page.getByRole("button", { name: "Check eligibility for refund?" });
        this.refundSpinner = page.locator("#refund-spinner");
        this.result = page.locator("#refund-result");

    }

    async verifyMyBooking(bookingRef, eventData) {

        await this.viewmybooking.click();
        await expect(this.page).toHaveURL(`${process.env.BASE_URL}/bookings`);
        await expect(this.myBooking.first()).toBeVisible();
        const masterCard = this.myBooking.filter({ has: this.page.locator(".booking-ref", { hasText: bookingRef }) })
        await expect(masterCard).toBeVisible();
        await expect(masterCard).toContainText(eventData.title);
    }

    async verifyMyeventseats(eventData, seatsBeforeBooking) {

        await this.page.locator("#nav-events").click();
        const myCard = this.eventCards.filter({ hasText: eventData.title });
        await expect(myCard).toBeVisible();
        const afterseatTextElement = myCard.getByText(/seat/i);
        const afterseats = await afterseatTextElement.innerText();
        const seatsAfterBooking = parseInt((afterseats).match(/\d+/))
        expect(seatsAfterBooking).toBe(seatsBeforeBooking - 1);


    }
    async verifyEventDetails() {
        await this.page.locator("#nav-bookings").click();
        await expect(this.page).toHaveURL(`${process.env.BASE_URL}/bookings`);
        await this.viewDetails.first().click();
        await expect(this.bookingInfo).toBeVisible();
        const bookingRef = await this.bookingRef.innerText();
        const eventTitle = await this.titleInfo.innerText();
        expect(bookingRef[0]).toBe(eventTitle[0]);
    }
    async checkRefundEligibility() {


        await this.checkRefund.click();
        await expect(this.refundSpinner).toBeVisible();
        await expect(this.refundSpinner).toBeHidden({ timeout: 6000 });
        const ticktets = await this.page.locator('span:text-is("Tickets")').locator('xpath=..').locator('.text-sm.font-medium').innerText();
        const ticketCount = parseInt(ticktets)
        await expect(this.result).toBeVisible();

        if (ticketCount === 1) {

            await expect(this.result).toContainText("Eligible for refund");
            await expect(this.result).toContainText("Single-ticket bookings qualify for a full refund")

        }
        else {
            await expect(this.result).toContainText("Not eligible for refund");
            await expect(this.result).toContainText(`Group bookings (${ticketCount} tickets) are non-refundable`)

        }

    }

}

module.exports = { MyBookingsPage }