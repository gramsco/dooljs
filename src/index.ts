import dayjs, { ConfigType } from "dayjs";

type EnglishDay =
  | "sunday"
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday"
  | "sunday";

type ListDays = EnglishDay[];
type DoolQuery = "day" | EnglishDay | ListDays;

const dict: ListDays = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
];

// are the params correct
function checkDays(query: DoolQuery) {
  if (query === "day") return;
  if (typeof query === "string") {
    if (!dict.includes(query)) {
      throw new Error(` |=> ${query} <=| is not in the list of days`);
    }
  } else {
    query.forEach((d) => {
      if (!dict.includes(d)) throw new Error(`${d} is not in the list of days`);
    });
  }
}

/**
 *
 * @param first The first day
 * @param last The second day
 * @param every The query, ie: "day", ["monday", "thursday"], "wednesday"
 */

function dool(first: ConfigType, last: ConfigType, every: DoolQuery = "day") {
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
      dates.push(cursor.toDate());
    } else {
      const today = dict[cursor.day()];
      if (every.includes(today)) {
        dates.push(cursor.toDate());
      }
    }
    if (!isArray && every !== "day") cursor = cursor.add(7, "day");
    else cursor = cursor.add(1, "day");
  }

  return dates;
}

export default dool;
