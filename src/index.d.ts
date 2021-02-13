import { ConfigType } from "dayjs";
declare type EnglishDay = "sunday" | "monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday" | "sunday";
declare type ListDays = EnglishDay[];
declare type DoolQuery = "day" | EnglishDay | ListDays;
/**
 *
 * @param first The first day
 * @param last The second day
 * @param every The query, ie: "day", ["monday", "thursday"], "wednesday"
 */
declare function dool(first: ConfigType, last: ConfigType, every?: DoolQuery): Date[];
export default dool;
