import {
  EVERY_DAY,
  listDays as dict,
  LIST_DAYS,
  SINGLE_DAY,
  DAY,
  DateQuery,
  ExtendedEnglishDay,
} from "./consts";

import { checkAndParse } from "./checkArray";
import { add, checkDate } from "./utils";

/**
 *
 * @param {DateQuery} firstDate can be either a Date object or a string
 * @param {DateQuery} secondDate can be either a Date object or a string
 * @param {DoolQuery} query Every day, or "monday"
 * @returns {Date[]} An array of dates
 */

function dool(
  firstDate: DateQuery,
  secondDate: DateQuery,
  _query: ExtendedEnglishDay = DAY
): Date[] | [] {
  const [validQuery, type, query] = checkAndParse(_query);

  if (!validQuery) {
    // eslint-disable-next-line
    console.error(
      "You should provide a valid query : 'tuesday' or ['monday', 'thursday'], ..."
    );
    return [];
  }

  const [isValidFirstDate, _firstDate] = checkDate(firstDate);
  const [isValidSecondDate, _secondDate] = checkDate(secondDate);

  if (!isValidFirstDate || !isValidSecondDate) {
    // eslint-disable-next-line
    console.error("You should provide two valid dates");
    return [];
  }

  if (_firstDate > _secondDate) {
    // eslint-disable-next-line
    console.error("Second Date must not be before first Date !");
    return [];
  }

  /* We look for the first date */
  let cursor = (() => {
    let dateCopy = new Date(_firstDate);
    switch (type) {
      case LIST_DAYS: {
        // eslint-disable-next-line
        while (true) {
          const d = dict[dateCopy.getDay()];
          if (query.includes(d)) break;
          dateCopy = add(dateCopy)(1)("day");
        }
        break;
      }
      case SINGLE_DAY: {
        // eslint-disable-next-line
        while (true) {
          const d = dict[dateCopy.getDay()];
          if (query === d) break;
          dateCopy = add(dateCopy)(1)("day");
        }
        break;
      }
      default: {
        break;
      }
    }
    return dateCopy;
  })();

  const dates = (() => {
    // eslint-disable-next-line no-shadow
    const dates = [];
    switch (type) {
      case EVERY_DAY:
        while (cursor <= _secondDate) {
          dates.push(cursor);
          cursor = add(cursor)(1)("day");
        }
        break;
      case SINGLE_DAY:
        while (cursor <= _secondDate) {
          dates.push(cursor);
          cursor = add(cursor)(7)("day");
        }
        break;
      case LIST_DAYS:
        while (cursor <= _secondDate) {
          const today = dict[cursor.getDay()];
          if (query.includes(today)) dates.push(cursor);
          cursor = add(cursor)(1)("day");
        }
        break;
      default: {
        throw new Error();
      }
    }
    return dates;
  })();

  return dates;
}

export default dool;
