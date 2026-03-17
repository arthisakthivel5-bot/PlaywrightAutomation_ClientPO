const {futureDateValue} = require("../utils/dateHelper")
async function generateEventData() {
    const timestamp = Date.now();
    const date =  (await futureDateValue()).toString();

    return {

        title: `Test Event ${timestamp}`,
        description: "Music Event for Children",
        city: "Coimbatore",
        venue: "RS Puram",
        date: `${date}T10:00`,
        seats: "150",
        price: "100"

    };

}

module.exports = {generateEventData}