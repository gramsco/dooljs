const dayjs = require("dayjs");
const dict = require("./dict.js");

function checkDays(dates) {
  if (dates === "day") return;
  if (typeof dates === "string") {
    if (!dict.includes(dates)) {
      throw new Error(` |=> ${dates} <=| is not in the list of days`);
    }
  } else {
    dates.forEach((d) => {
      if (!dict.includes(d)) throw new Error(`${d} is not in the list of days`);
    });
  }
}

/**
 * @param {*} first A parsable (by dayJS) date
 * @param {*} last A parsable (by dayJS) date
 * @param {*} every The date : "day", ["monday", "tuesday"], etc.
 *
 * ex : let dates = generate("2021-01-31", "2022-01-31", ["monday", "friday"]);
 */

function generate(first, last, every = "day") {
  if (!every) return [];

  const firstDate = dayjs(first);
  const lastDate = dayjs(last);

  if (!firstDate.isValid() || !lastDate.isValid()) {
    throw new Error("You should provide two valid dates");
  }

  const isArray = Array.isArray(every);

  if (firstDate.isAfter(lastDate)) {
    throw new Error("First date cannot be after last date");
  }

  // It's an array of days
  if (isArray) {
    if (every.length > 7) {
      throw new Error(`There is only 7 days in a week, not ${every.length}`);
    }
  }

  checkDays(every);

  let cursor = dayjs(first);

  // go the next specified day
  if (every !== "day") {
    // eslint-disable-next-line
    while (true) {
      const day = dict[cursor.day()];
      const isIn = isArray ? every.includes(day) : every === day;
      if (isIn) break;
      cursor = cursor.add(1, "day");
    }
  }

  const dates = [];

  while (cursor.isBefore(lastDate)) {
    if (every === "day") {
      dates.push(new Date(cursor));
    } else {
      const today = dict[cursor.day()];
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
