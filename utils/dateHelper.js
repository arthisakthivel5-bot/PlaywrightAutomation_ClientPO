 async function futureDateValue(days = 1) {


    const date = new Date();
    date.setDate(date.getDate() + days);
    const year = date.getFullYear();
    const month = String(date.getMonth()+1).padStart(2,"0");
    const day = date.getDate();

    return `${year}-${month}-${day}`;
    
 }

 module.exports = {futureDateValue};