const dayjs = require("dayjs");
const dool = require("../dist/index.umd.js");

const randomValue = (max = 100) => Math.floor(Math.random() * max) + 10;

const randomDate = (d = new Date()) => dayjs(d).add(randomValue(), "day");

const dict = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
];

const randomQuery = () => {
  const values = [...dict, "day"];
  const query = [];
  const randBool = () => Boolean(Math.random() >= 0.5);
  values.forEach((v) => {
    if (randBool) query.push(v);
  });
};

test("A year in days is 365 or 366 dool", () => {
  const { length } = dool("2020-01-05", "2021-01-05", "day");
  expect(length).toBeGreaterThanOrEqual(365);
  expect(length).toBeLessThan(367);
});

test("Should always match the given day ", () => {
  const today = new Date();
  const nextDate = randomDate();
  dict.forEach((day) => {
    const res = dool(today, nextDate, day).every(
      (el) => day === dict[el.getDay()]
    );
    expect(res).toBe(true);
  });
});

test("All returned elements are valid JS dates", () => {
  const today = new Date();
  const nextDate = randomDate();
  const days = dool(today, nextDate, randomQuery());
  const isValidJSDate = (d) => d instanceof Date;
  const allDatesChecked = days.map(isValidJSDate).every(Boolean);
  expect(allDatesChecked).toBe(true);
});

test("Handle wrong inputs", () => {
  expect(dool("toto", "tutu", "day")).toEqual([]);
  expect(dool("toto", new Date(), "day")).toEqual([]);
  expect(dool(new Date(), "toto", "day")).toEqual([]);
  expect(dool(new Date(), new Date(), "toto")).toEqual([]);
});
