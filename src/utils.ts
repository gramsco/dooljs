import {
  DAY,
  DAYS,
  WEEK,
  WEEKS,
  TimeQuery,
  DateQuery,
  CheckedDate,
} from "./consts";

const asD = (d: DateQuery): Date => new Date(d);
const isValidDate = (d: Date): boolean => d.toString() !== "Invalid Date";

/**
 *
 * @param {DateQuery} Date
 * @returns {CheckedDate} A nice tuple
 * @description Checks if the provided date is valid
 *
 */

function checkDate(date: DateQuery): CheckedDate {
  const asDate = asD(date);
  return [isValidDate(asDate), asDate];
}

const add = (date: Date) => (n: number) => (what: TimeQuery): Date => {
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

// eslint-disable-next-line object-curly-newline
export { add, asD, isValidDate, checkDate };
