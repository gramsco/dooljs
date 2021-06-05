import {
  listDays as dict,
  IS_STRING,
  IS_OBJECT,
  DAY,
  EVERY_DAY,
  SINGLE_DAY,
  LIST_DAYS,
  WRONG_QUERY,
  DoolQuery,
  QueryType,
  ArrayQuery,
  ExtendedEnglishDay,
} from "./consts";

type CheckedQuery = [boolean, QueryType, DoolQuery];

// I guess this can technically be "any" query, that's why we check
export function checkAndParseArray(query: ArrayQuery): CheckedQuery {
  if (query.includes(DAY)) return [true, EVERY_DAY, query];
  if (query.length === 1 && dict.includes(query[0])) {
    return [true, SINGLE_DAY, query[0]];
  }
  // eslint-disable-next-line operator-linebreak
  const isValid =
    query.filter((q: ExtendedEnglishDay) => {
      const ok = dict.includes(q);
      // eslint-disable-next-line
      if (!ok) console.warn(`${q} is not a valid day`);
      return ok;
    }).length !== 0; // at least one day is valid, I Guess

  return [isValid, isValid ? LIST_DAYS : WRONG_QUERY, query];
}

export function checkAndParse(query: ExtendedEnglishDay): CheckedQuery {
  if (!query) {
    return [false, WRONG_QUERY, query];
  }
  switch (typeof query) {
    case IS_OBJECT:
      if (Array.isArray(query)) {
        return checkAndParseArray(query);
      }
      return [false, WRONG_QUERY, query];

    case IS_STRING: {
      if (query === DAY) return [true, EVERY_DAY, query];
      if (dict.includes(query)) return [true, SINGLE_DAY, query];
      return [false, WRONG_QUERY, query];
    }
    default:
      return [false, WRONG_QUERY, query];
  }
}
