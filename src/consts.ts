export type EnglishDay =
  | "sunday"
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday";

export type ExtendedEnglishDay = EnglishDay | "day";

export const listDays: ExtendedEnglishDay[] = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
];

export const EVERY_DAY = "everyDay";
export const SINGLE_DAY = "oneDay";
export const LIST_DAYS = "listDays";
export const WRONG_QUERY = "Wrong query";
export const IS_OBJECT = "object";
export const IS_STRING = "string";
export const DAY = "day";
export const DAYS = "days";
export const WEEK = "week";
export const WEEKS = "weeks";

export declare type QueryType =
  | typeof EVERY_DAY
  | typeof SINGLE_DAY
  | typeof LIST_DAYS
  | typeof WRONG_QUERY;

export declare type TimeQuery =
  | typeof DAY
  | typeof DAYS
  | typeof WEEK
  | typeof WEEKS;

export declare type DoolQuery =
  | ExtendedEnglishDay
  | ExtendedEnglishDay[]
  | typeof DAY;

export declare type ArrayQuery = ExtendedEnglishDay[];
export declare type CheckedDate = [boolean, Date];
export declare type DateQuery = Date | string | number;
