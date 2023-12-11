import fs from "fs";

const start = Date.now();

const categories = fs.readFileSync("./input.txt", "utf-8").split("\n\n");
const seeds = categories[0]
  .split(" ")
  .slice(1)
  .map((x) => parseInt(x));

const maps = categories.slice(1).map((m) =>
  m
    .split("\n")
    .filter((line) => !isNaN(parseInt(line.trim().replace(" ", ""))))
    .map((line) => line.split(" ").map((x) => parseInt(x)))
);

const ranges: number[][] = [];

for (let i = 0; i < seeds.length; i += 2) {
  ranges.push([seeds[i], seeds[i + 1] + seeds[i]]);
}

// 1,589,455,465 numbers in the ranges
let min = 999999999999;
let amt = 0;
let percent = 0;

for (let range of ranges) {
  for (let i = range[0]; i < range[1]; i++) {
    // in here is 1,589,455,465 repitions (7 minutes)
    let num = i;
    for (let map of maps) {
      for (let map_line of map) {
        // Probably ~ 70 minutes
        if (num >= map_line[1] && num < map_line[1] + map_line[2]) {
          num = map_line[0] + num - map_line[1];
          break;
        }
      }
    }
    if (num < min) {
      console.log("New min:", num);
      min = num;
    }
    amt++;
    if (Math.floor((amt * 100) / 1589455465) > percent) {
      percent++;
      console.log(`${percent}% Done, ${Date.now() - start} ms`);
    }
  }
}

console.log(min);

console.log("Ran in", Date.now() - start);
