const dayjs = require("dayjs");
const { dool } = require("../dist");

const weekDays = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
];

// Utils functions for people who like curry
const randomValue = (max = 100) => Math.floor(Math.random() * max) + 10;
const randomDate = (d = new Date()) => dayjs(d).add(randomValue(), "day");
const getTwoDates = () => [new Date(), randomDate()];
const generate = (dates = getTwoDates()) => (query) => dool(...dates, query);

const randomQuery = () => {
  const values = [...weekDays, "day"];
  const query = [];
  const randBool = () => Boolean(Math.random() >= 0.5);
  values.forEach((v) => {
    if (randBool()) query.push(v);
  });
  return query;
};

const allRandom = () => generate()(randomQuery());
const getYearDistance = () => [new Date(), dayjs().add(1, "year")];

const compare = (q1) => (q2) => {
  const dates = getTwoDates();
  const g1 = generate(dates)(q1);
  const g2 = generate(dates)(q2);
  return [g1, g2];
};

test("A year in days is 365 or 366 dool", () => {
  const d = getYearDistance();
  const { length } = generate(d)();
  expect(length).toBeGreaterThanOrEqual(365);
  expect(length).toBeLessThan(367);
});

test("Should always match the given day ", () => {
  weekDays.forEach((day) => {
    const res = generate()(day).every((el) => day === weekDays[el.getDay()]);
    expect(res).toBe(true);
  });
});

test("All returned elements are valid JS dates", () => {
  const days = allRandom();
  const isValidJSDate = (d) => d instanceof Date;
  const allDatesChecked = days.map(isValidJSDate).every(Boolean);
  expect(allDatesChecked).toBe(true);
});

test("Should works with duplicates", () => {
  const q1 = ["monday", "monday", "thursday"];
  const q2 = ["monday", "thursday"];
  const [r1, r2] = compare(q1)(q2);
  expect(r1).toEqual(r2);
});

test("A list of only a single day works", () => {
  const q1 = ["monday"];
  const q2 = "monday";
  const [r1, r2] = compare(q1)(q2);
  expect(r1).toEqual(r2);
});

test('"day" === everyyyy day', () => {
  const q1 = "day";
  const [r1, r2] = compare(q1)(weekDays);
  expect(r1).toEqual(r2);
});

test('If "day" is present, then it\'s gonna be every day', () => {
  const q1 = "day";
  const q2 = ["monday", "thursday", "day"];
  const [r1, r2] = compare(q1)(q2);
  expect(r1).toEqual(r2);
});

test("String query must be a valid day", () => {
  const r1 = generate()("trucuadad");
  const r2 = generate()("daindaida");
  const r3 = generate()("dabiodad");
  const r4 = generate()("toto");
  [r1, r2, r3, r4].forEach((r) => {
    expect(r).toEqual([]);
  });
});

test("Array should have at least one correct element (a warning is issued when a day is invalid)", () => {
  const q1 = ["monday", "saturday", "trucuadad", "bdioauhidjpa"];
  const q2 = ["monday", "saturday"];
  const [r1, r2] = compare(q1)(q2);
  expect(r1).toEqual(r2);

  const q3 = ["day", "oodianodada", "thursday"];
  const q4 = "day";
  const [r3, r4] = compare(q3)(q4);
  expect(r3).toEqual(r4);

  const r5 = generate()(["dadada"]);
  const r6 = generate()([]);
  const r7 = generate()([
    "dbaodipja",
    ")àajdphnobauh",
    "hbiduabd ahidouniada",
    "daubdoiajdna jndaioda",
  ]);

  [(r5, r6, r7)].forEach((r) => {
    expect(r).toEqual([]);
  });
});
