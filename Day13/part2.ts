import fs from "fs";

const patterns = fs.readFileSync("./input.txt", "utf-8").split("\n\n");

let sum = 0;
// 35135 too high
// 33975
const areEq = (list1: string[], list2: string[]) => {
  const minLen = Math.min(list1.length, list2.length);
  return (
    JSON.stringify(list1.slice(0, minLen)) ===
    JSON.stringify(list2.slice(0, minLen))
  );
};

for (let pattern of patterns) {
  const rows = pattern.split("\n");
  let didAdd = false;
  for (let y = 1; y < rows.length; y++) {
    if (areEq(rows.slice(0, y).reverse(), rows.slice(y))) {
      sum += y * 100;
      didAdd = true;
      break;
    }
  }
  if (didAdd) continue;

  const cols = rows[0]
    .split("")
    .map((_, x) => rows.map((row, i) => row[x]).join(""));
  for (let x = 1; x < cols.length; x++) {
    if (areEq(cols.slice(0, x).reverse(), cols.slice(x))) {
      sum += x;
      break;
    }
  }
}

console.log(sum);
