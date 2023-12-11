import fs from "fs";

let data = fs.readFileSync("./input.txt", "utf-8").split("\n");

const emptyRows: number[] = [];
const emptyCols: number[] = [];

for (let y = 0; y < data.length; y++) {
  if (!data[y].match(new RegExp("#"))) {
    emptyRows.push(y);
  }
}

for (let x = 0; x < data[0].length; x++) {
  const col = data.map((line, i) => line[x]).join("");
  if (!col.match(new RegExp("#"))) {
    emptyCols.push(x);
  }
}

const galaxies: number[][] = [];
for (let i = 0; i < data.length; i++) {
  galaxies.push(
    ...[...data[i].matchAll(new RegExp("#", "g"))].map((a) => [i, a.index])
  );
}

let sum = 0;

// Too low: 526924917921
// What:    410224360913

console.log(emptyCols.length, emptyRows.length);

for (let firstIdx = 0; firstIdx < galaxies.length; firstIdx++) {
  for (let secondIdx = firstIdx + 1; secondIdx < galaxies.length; secondIdx++) {
    let first = galaxies[firstIdx];
    let second = galaxies[secondIdx];
    const newFirst = first.map((x) => x);
    const newSecond = second.map((x) => x);

    for (let emptyRowNum of emptyRows) {
      if (second[0] > emptyRowNum) {
        newSecond[0] += 999999;
      }
      if (first[0] > emptyRowNum) {
        newFirst[0] += 999999;
      }
    }
    for (let emptyColNum of emptyCols) {
      if (second[1] > emptyColNum) {
        newSecond[1] += 999999;
      }
      if (first[1] > emptyColNum) {
        newFirst[1] += 999999;
      }
    }

    sum +=
      Math.abs(newSecond[1] - newFirst[1]) +
      Math.abs(newSecond[0] - newFirst[0]);
  }
}

console.log(sum);
