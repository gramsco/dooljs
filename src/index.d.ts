import { ConfigType } from "dayjs";
declare type EnglishDay = "sunday" | "monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday" | "sunday";
declare type WithSingleDay = EnglishDay | "day";
declare type ListDays = WithSingleDay[];
declare type DoolQuery = "day" | WithSingleDay | ListDays;
declare function dool(firstDate: ConfigType, secondDate: ConfigType, query?: DoolQuery): Date[] | [];
export default dool;
