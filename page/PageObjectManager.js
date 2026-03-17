const {CreateEventPage} = require("./CreateEventPage")
const {UpcomingEventsPage} = require("./UpcomingEventsPage")
const {MyBookingsPage} = require("./MyBookingsPage")

class PageObjectManager{
    constructor(page){
        this.page = page;
        this.createEventPage = new CreateEventPage(page);
        this.upcomingEventsPage = new UpcomingEventsPage(page);
        this.myBookingsPage = new MyBookingsPage(page);
    }

    getCreateEventPage(){
        return this.createEventPage;
    }

    getUpcomingEventsPage(){
        return this.upcomingEventsPage;
    }
    getMyBookingsPage(){
        return this.myBookingsPage;
    }
}

module.exports = {PageObjectManager}