const {expect} = require("@playwright/test")

class CreateEventPage {

    constructor(page) {
        this.page = page;
        this.eventTitle = page.locator("#event-title-input");
        this.description = page.locator("#admin-event-form textarea")
        this.city = page.getByLabel("City");
        this.venue = page.getByLabel("Venue");
        this.eventDateTime = page.getByLabel("Event Date & Time");
        this.totalSeats = page.getByRole("spinbutton", { name: "Total Seats" });
        this.price = page.getByLabel("Price ($)");
        this.addEventBtn = page.locator("#add-event-btn");
        this.successToast = page.getByText("Event created!")


    }

    async createEvent(eventData) {

        await this.page.goto(`${process.env.BASE_URL}/admin/events`);
        await this.eventTitle.fill(eventData.title);
        await this.description.fill(eventData.description)
        await this.city.fill(eventData.city);
        await this.venue.fill(eventData.venue);
        await this.eventDateTime.fill(eventData.date);
        await this.totalSeats.fill(eventData.seats)
        await this.price.fill(eventData.price);
        await this.addEventBtn.click();
        await expect(this.successToast).toBeVisible();
    }

}

module.exports = { CreateEventPage }