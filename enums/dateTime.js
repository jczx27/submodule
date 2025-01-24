const DATE_FORMAT="YYYY-MM-DD"
const DATE_TIME_FORMAT="YYYY-MM-DD HH:mm:ss"
const DAYS_OF_WEEK={
  SUN: 'Sunday',
  MON: 'Monday',
  TUE: 'Tuesday',
  WED: 'Wednesday',
  THU: 'Thursday',
  FRI: 'Friday',
  SAT: 'Saturday',
};

const INTERVALS={
  sorting: 1,
  germination: 3,
  transplant1: 10,
  transplant2: 20,
  cutoff: 5,
  fulfillment: 35,
  week: 7,
  channelGermination: 3,
  channelTransplant1: 14,
  channelTransplant2: 21,
};

module.exports={
  DATE_FORMAT,
  DATE_TIME_FORMAT,
  DAYS_OF_WEEK,
  INTERVALS
}