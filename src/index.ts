const EVERY_DAY = "everyDay";
const SINGLE_DAY = "oneDay";
const LIST_DAYS = "listDays";

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

type TimeQuery = "day" | "days" | "week" | "weeks";

type CheckedDate = [boolean, Date];

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
  if (query.length === 1 && dict.includes(query[0])) {
    return [true, SINGLE_DAY, query[0]];
  }
  const allGood = query.filter((q) => {
    const ok = dict.includes(q);
    // eslint-disable-next-line
    if (!ok) console.warn(`${q} is not a valid day`);
    return ok;
  });
  const isValid = !!allGood.length;
  return [isValid, isValid ? LIST_DAYS : WRONG_QUERY, allGood];
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
      return [false, WRONG_QUERY, query];
    }
    default:
      return [false, WRONG_QUERY, query];
  }
}

const asD = (d: Date) => new Date(d);
const isValidDate = (d: Date) => d.toString() !== "Invalid Date";
const add = (date: Date) => (n: number) => (what: TimeQuery) => {
  switch (what) {
    case "day":
    case "days": {
      const copy = new Date(date);
      copy.setDate(date.getDate() + n);
      return copy;
    }
    case "week":
    case "weeks": {
      const copy = new Date(date);
      copy.setDate(date.getDate() + n);
      return copy;
    }
    default: {
      throw new Error("wrong");
    }
  }
};

function checkDates(first: Date, second: Date): [CheckedDate, CheckedDate] {
  // eslint-disable-next-line
  const _first = asD(first);
  // eslint-disable-next-line
  const _second = asD(second);
  return [
    [isValidDate(_first), _first],
    [isValidDate(_second), _second],
  ];
}

function dool(firstDate: Date, secondDate: Date, query: DoolQuery = "day") {
  const [validQuery, type, _query] = checkAndParse(query);

  if (!validQuery) {
    // eslint-disable-next-line
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
    // eslint-disable-next-line
    console.error("You should provide two valid dates");
    return [];
  }

  if (_firstDate > _secondDate) {
    // eslint-disable-next-line
    console.error("Second Date must not be before first Date !");
    return [];
  }

  let cursor = (() => {
    let c = new Date(_firstDate);
    switch (type) {
      case LIST_DAYS: {
        // eslint-disable-next-line
        while (true) {
          const d = dict[c.getDay()];
          if (_query.includes(d)) break;
          c = add(c)(1)("day");
        }
        break;
      }
      case SINGLE_DAY: {
        // eslint-disable-next-line
        while (true) {
          const d = dict[c.getDay()];
          if (_query === d) break;
          c = add(c)(1)("day");
        }
        break;
      }
      default: {
        break;
      }
    }
    return c;
  })();

  const dates = (() => {
    // eslint-disable-next-line
    let dates = [];
    switch (type) {
      case EVERY_DAY:
        while (cursor < _secondDate) {
          dates.push(cursor);
          cursor = add(cursor)(1)("day");
        }
        break;
      case SINGLE_DAY:
        while (cursor < _secondDate) {
          dates.push(cursor);
          cursor = add(cursor)(7)("day");
        }
        break;
      case LIST_DAYS:
        while (cursor < _secondDate) {
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
