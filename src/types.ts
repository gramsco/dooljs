import {
  DAY,
  DAYS,
  WEEK,
  WEEKS,
  EVERY_DAY,
  LIST_DAYS,
  SINGLE_DAY,
  WRONG_QUERY,
} from "./consts";

export declare type QueryType =
  | typeof EVERY_DAY
  | typeof SINGLE_DAY
  | typeof LIST_DAYS
  | typeof WRONG_QUERY;

// types
export type EnglishDay =
  | "sunday"
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday";

export declare type DoolQuery = typeof DAY | EnglishDay[] | EnglishDay;
export declare type ArrayQuery = (typeof DAY | EnglishDay)[];
export declare type CheckedDate = [boolean, Date];
export declare type DateQuery = Date | string | number;
export declare type TimeQuery =
  | typeof DAY
  | typeof DAYS
  | typeof WEEK
  | typeof WEEKS;
