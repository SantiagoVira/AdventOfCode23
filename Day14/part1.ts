import fs from "fs";

const data = fs.readFileSync("./input.txt", "utf-8").split("\n");

const cols = data[0]
  .split("")
  .map((_, colNum) => data.map((line) => line[colNum]));
console.log(cols);

for (let col of cols) {
  let lastStop = -1;
  for (let i = 0; i < col.length; i++) {
    if (col[i] === "O") {
      col.i;
    }
  }
}
