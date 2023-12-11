import fs from "fs";

let data = fs.readFileSync("./input.txt", "utf-8").split("\n");

for (let y = 0; y < data.length; y++) {
  if (!data[y].match(new RegExp("#"))) {
    data = [
      ...data.slice(0, y),
      ...new Array(999999).fill(data[y]),
      ...data.slice(y),
    ];
    y += 999999;
  }
}

for (let x = 0; x < data[0].length; x++) {
  const col = data.map((line, i) => line[x]).join("");
  if (!col.match(new RegExp("#"))) {
    data = data.map(
      (line) => line.slice(0, x) + ".".repeat(999999) + line.slice(x)
    );
    x += 999999;
  }
}

const galaxies: number[][] = [];
for (let i = 0; i < data.length; i++) {
  galaxies.push(
    ...[...data[i].matchAll(new RegExp("#", "g"))].map((a) => [i, a.index])
  );
}

let sum = 0;

console.log("all set");

for (let firstIdx = 0; firstIdx < galaxies.length; firstIdx++) {
  for (let secondIdx = firstIdx + 1; secondIdx < galaxies.length; secondIdx++) {
    sum +=
      Math.abs(galaxies[secondIdx][1] - galaxies[firstIdx][1]) +
      Math.abs(galaxies[secondIdx][0] - galaxies[firstIdx][0]);
  }
}

console.log(sum);
