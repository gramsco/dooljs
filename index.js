const dayjs = require("dayjs");

const dict = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
];

function checkDays(dates) {
  dates.forEach((d) => {
    if (!dict.includes(d)) throw new Error(`${d} is not in the list of days`);
  });
}

/**
 * @param {*} first A parsable (by dayJS) date
 * @param {*} last A parsable (by dayJS) date
 * @param {*} every The dates we need : "day" (everyday), ["monday", "tuesday"] (every monday and tuesday), "friday" (every friday)
 *
 * ex : let dates = generate("2021-01-31", "2022-01-31", ["monday", "friday"]);
 */

function generate(first, last, every = "day") {
  const firstDate = dayjs(first);
  const lastDate = dayjs(last);

  const isArray = Array.isArray(every);

  if (firstDate.isAfter(lastDate)) {
    throw new Error("First date cannot be after last date");
  }

  // It's an array of days
  if (isArray) {
    if (every.length > 7) {
      throw new Error("There is only 7 days in a week, not " + every.length);
    } else {
      checkDays(every);
    }
  }

  let cursor = dayjs(first);

  // go the next specified day
  if (every !== "day") {
    while (true) {
      let day = dict[cursor.day()];
      let isIn = isArray ? every.includes(day) : every === day;
      if (isIn) break;
      cursor = cursor.add(1, "day");
    }
  }

  let dates = [];

  while (cursor.isBefore(lastDate)) {
    if (every === "day") {
      dates.push(new Date(cursor));
    } else {
      let today = dict[cursor.day()];
      if (every.includes(today)) {
        dates.push(new Date(cursor));
      }
    }
    if (!isArray && every !== "day") cursor = cursor.add(7, "day");
    else cursor = cursor.add(1, "day");
  }

  return dates;
}

module.exports = generate;
