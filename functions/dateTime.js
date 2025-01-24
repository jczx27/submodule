const moment=require('moment');
const {INTERVALS, DATE_FORMAT, DATE_TIME_FORMAT, DAYS_OF_WEEK}=require('../enums/dateTime');
const {mod}=require('./common');



exports.getTimelineState=function (today, fulfillmentDate) {
    return today<fulfillmentDate? 1:2
};

exports.getNextDateFrom=function (date, day, cutoffTime) { // date is a momentJS date object; day is a string e.g. 'Friday'; cutoffTime is a string 'HH:mm'
    if (typeof date==='string') date=moment(date);
    // get the day of the date parameter
    const dayOfDate=date.day();
    const d1=dayOfDate;
    const d2=Object.values(DAYS_OF_WEEK).findIndex(d => d===day);

    // e.g. d1 is 3 which represents Wednesday, and d2 is 0 which represents Sunday
    // Calculate the difference (d2 - d1) as a number from 1 to 7; in this case (0 - 3) modulo 7 is 4
    let diff=mod(d2-d1, 7, false);

    // but if the cutoff is exceeded for next-day delivery, deliver in 8 days' time, not 1.
    if (diff===1&&cutoffTime&&moment(cutoffTime, 'HH:mm').isBefore(moment(date.format('HH:mm'), 'HH:mm'))) diff+=7;

    // Since diff is 4, we add 4 days to the original date and return the answer in the format YYYY-MM-DD
    return date.clone().add(diff, "d").format(DATE_FORMAT);
}

exports.getDatesBetweenRange=function (start, end) {
    const startDate=moment(start, DATE_FORMAT);
    const endDate=moment(end, DATE_FORMAT);
    const days=[];
    let day=startDate;
    while (day<=endDate) {
        days.push(day.format(DATE_FORMAT));
        day=day.clone().add(1, "d");
    }
    return days
};

exports.displayDate=function (date, withTime=false, displayWithDay=false, displayWithYear=true) {
    // pass in a date string YYYY-MM-DD, or, if withTime, YYYY-MM-DD HH:mm:ss or YYYY-MM-DDTHH:mm:ss.
    return moment(date, withTime? DATE_TIME_FORMAT:DATE_FORMAT).format(`${displayWithDay? 'ddd, ':''}DD MMM ${displayWithYear? 'YYYY':''}${withTime? " HH:mm:ss":""}`);
};

exports.getTransplant2Date=function (fulfillmentDate) {
    return moment(fulfillmentDate, DATE_FORMAT).subtract(INTERVALS.transplant2, "days").format(DATE_FORMAT);
};
exports.getTransplant1Date=function (fulfillmentDate) {
    return moment(this.getTransplant2Date(fulfillmentDate), DATE_FORMAT).subtract(INTERVALS.transplant1, "days").format(DATE_FORMAT);
};
exports.getGerminationDate=function (fulfillmentDate) {
    return moment(this.getTransplant1Date(fulfillmentDate), DATE_FORMAT).subtract(INTERVALS.germination, "days").format(DATE_FORMAT);
};

exports.getB2CPullDate=function (fulfillmentDate) {
    return moment(this.getGerminationDate(fulfillmentDate), DATE_FORMAT).subtract(INTERVALS.sorting, "days").format(DATE_FORMAT);
};






exports.getCutoffDate=function (fulfillmentDate) {
    return moment(fulfillmentDate, DATE_FORMAT).subtract(INTERVALS.cutoff, "days").format(DATE_FORMAT);
};

exports.getFulfillmentDateFromGerminationDate=function (germinationDate) {
    return moment(germinationDate, DATE_FORMAT).add(INTERVALS.germination+INTERVALS.transplant1+INTERVALS.transplant2, "days").format(DATE_FORMAT);
};

exports.getFulfillmentDateFromTransplant1Date=function (transplant1Date) {
    return moment(transplant1Date, DATE_FORMAT).add(INTERVALS.transplant1+INTERVALS.transplant2, "days").format(DATE_FORMAT);
};

exports.getFulfillmentDateFromTransplant2Date=function (transplant2Date) {
    return moment(transplant2Date, DATE_FORMAT).add(INTERVALS.transplant2, "days").format(DATE_FORMAT);
};