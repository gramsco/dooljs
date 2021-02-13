import dayjs, { ConfigType, Dayjs } from "dayjs";

const EVERY_DAY = "everyDay";
const SINGLE_DAY = "oneDay";
const LIST_DAYS = "listDAys";

const WRONG_QUERY = "Wrong query";

type EnglishDay =
  | "sunday"
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday"
  | "sunday";

type WithSingleDay = EnglishDay | "day";
type ListDays = WithSingleDay[];

type DoolQuery = "day" | WithSingleDay | ListDays;
type QueryType =
  | typeof EVERY_DAY
  | typeof SINGLE_DAY
  | typeof LIST_DAYS
  | typeof WRONG_QUERY;
type CheckedQuery = [boolean, QueryType, DoolQuery];

type CheckedDate = [boolean, Dayjs];

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

function checkAndParseArray(query: ListDays): CheckedQuery {
  if (query.includes("day")) return [true, EVERY_DAY, query];
  else return [query.every((d) => dict.includes(d)), LIST_DAYS, query];
}

function checkAndParse(query: DoolQuery): CheckedQuery {
  if (!query) {
    return [false, WRONG_QUERY, query];
  }
  switch (typeof query) {
    case "object":
      if (Array.isArray(query)) {
        return checkAndParseArray(query);
      }
      return [false, WRONG_QUERY, query];

    case "string": {
      if (query === "day") return [true, EVERY_DAY, query];
      if (dict.includes(query)) return [true, SINGLE_DAY, query];
    }
    default:
      return [false, WRONG_QUERY, query];
  }
}

function checkDates(
  first: ConfigType,
  second: ConfigType
): [CheckedDate, CheckedDate] {
  let _first = dayjs(first);
  let _second = dayjs(second);

  return [
    [_first.isValid(), _first],
    [_second.isValid(), _second],
  ];
}

function dool(
  firstDate: ConfigType,
  secondDate: ConfigType,
  query: DoolQuery = "day"
): Date[] | [] {
  const [validQuery, type, _query] = checkAndParse(query);

  if (!validQuery) {
    console.error(
      "You should provide a valid query : 'day', ['monday', 'thursday'], ..."
    );
    return [];
  }

  const [
    [isValidFirstDate, _firstDate],
    [isValidSecondDate, _secondDate],
  ] = checkDates(firstDate, secondDate);

  if (!isValidFirstDate || !isValidSecondDate) {
    console.error("You should provide two valid dates");
    return [];
  }

  if (_firstDate.isAfter(_secondDate)) {
    console.error("Second Date must not be before first Date !");
    return [];
  }

  let cursor = (() => {
    let c = _firstDate.clone();
    switch (type) {
      case LIST_DAYS: {
        while (true) {
          const d = dict[c.day()];
          if (_query.includes(d)) break;
          c = c.add(1, "day");
        }
      }
      case SINGLE_DAY: {
        while (true) {
          const d = dict[c.day()];
          if (_query === d) break;
          c = c.add(1, "day");
        }
      }
    }
    return c;
  })();

  const dates = (() => {
    let dates = [];
    switch (type) {
      case EVERY_DAY:
        while (cursor.isBefore(_secondDate)) {
          dates.push(cursor.toDate());
          cursor = cursor.add(1, "day");
        }
        break;
      case SINGLE_DAY:
        while (cursor.isBefore(_secondDate)) {
          dates.push(cursor.toDate());
          cursor = cursor.add(7, "day");
        }
        break;
      case LIST_DAYS:
        while (cursor.isBefore(_secondDate)) {
          const today = dict[cursor.day()];
          if (query.includes(today)) dates.push(cursor.toDate());
          cursor = cursor.add(1, "day");
        }
        break;
    }
    return dates;
  })();

  return dates;
}

export default dool;
