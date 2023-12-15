import fs from "fs";

const data = fs.readFileSync("./input.txt", "utf-8").split(",");

let sum = 0;
for (let j = 0; j < data.length; j++) {
  let current = 0;
  for (let i = 0; i < data[j].length; i++) {
    current += data[j][i].charCodeAt(0);
    current = (current * 17) % 256;
  }
  const label = data[j];
  const boxNum = current;
}

console.log(sum);
