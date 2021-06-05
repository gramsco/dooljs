import { DAY, DAYS, WEEK, WEEKS } from "./consts";
import { TimeQuery, DateQuery, CheckedDate } from "./types";

/**
 *
 * @param {DateQuery} Date
 * @returns {CheckedDate} A nice tuple
 * @description Checks if the provided date is valid
 *
 */

function checkDate(date: DateQuery): CheckedDate {
  let asDate = asD(date);
  return [isValidDate(asDate), asDate];
}

const add = (date: Date) => (n: number) => (what: TimeQuery) => {
  switch (what) {
    case DAY:
    case DAYS: {
      const copy = new Date(date);
      copy.setDate(date.getDate() + n);
      return copy;
    }
    case WEEK:
    case WEEKS: {
      const copy = new Date(date);
      copy.setDate(date.getDate() + n);
      return copy;
    }
    default: {
      throw new Error("wrong query");
    }
  }
};

const asD = (d: DateQuery) => new Date(d);
const isValidDate = (d: Date) => d.toString() !== "Invalid Date";

export { add, asD, isValidDate, checkDate };
