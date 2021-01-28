const dayjs = require("dayjs");
const dict = require("./dict");
const days = require("./index");

test("A year in days is 365 or 366 days", () => {
  const { length } = days("2020-01-05", "2021-01-05", "day");
  expect(length).toBeGreaterThanOrEqual(365);
  expect(length).toBeLessThan(367);
});

test("Should always match the given day ", () => {
  const today = dayjs(new Date());
  const r = Math.floor(Math.random() * 100) + 10;
  const nextDate = today.add(r, "day");
  dict.forEach((day) => {
    const res = days(today, nextDate, day).every(
      (el) => day === dict[el.getDay()]
    );
    expect(res).toBe(true);
  });
});

test("Handle wrong inputs", () => {
  expect(() => {
    days("toto", "tutu", "day");
  }).toThrow();
  expect(() => {
    days("toto", new Date(), "day");
  }).toThrow();
  expect(() => {
    days(new Date(), "toto", "day");
  });
  expect(() => {
    days(new Date(), new Date(), "toto");
  }).toThrow();
});
