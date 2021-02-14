# Dool.js


[![Edit intelligent-dew-g5dr3](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/intelligent-dew-g5dr3?fontsize=14&hidenavigation=1&theme=dark)


Dool.js is a package based on <a href="https://github.com/iamkun/dayjs">dayjs</a> that allows you to generate the list of days between two dates.



## Why?

Well, because I needed to schedule things easily, comrade, that's why!

## Ok, but why "dool" ?

Dr. Drake Ramoray, of course

## And how does it work?

ya know the drill:

    $ npm i dooljs

and then:

```javascript
const dool = require("dooljs");

const day1 = "2013-04-08";
const day2 = new Date(); // today, 2021-01-30
const days = dool(day1, day2);

console.log(days.length);

// 2855
```

You can look for a specific day of the week :

```javascript
const dool = require("dooljs");

const day1 = "1972-01-30";
const day2 = new Date(); // today, 2021-01-30
const sundays = dool(day1, day2, "sunday");

console.log(sundays);

/*
[
  1972-01-29T23:00:00.000Z, 
  1972-02-05T23:00:00.000Z, 
  1972-02-12T23:00:00.000Z,  
...]
*/

console.log(sundays.length);

// 2557
```

You can also pass an array of week days:

```javascript
const dool = require("dooljs");

const day1 = "1990-02-16";
const day2 = new Date(); // today, 2021-01-30
const weeknds = dool(day1, day2, ["saturday", "sunday"]);

console.log(weeknds.length);

// => 3231 saturdays and sundays (today was a saturday, hence the odd number :D)
```

Beware, as:

    ⚠️  Valid dates are dates that can be parsed by dayjs


🤖 Enjoy 🤖
