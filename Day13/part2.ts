import fs from "fs";

const patterns = fs.readFileSync("./input.txt", "utf-8").split("\n\n");

let sum = 0;
// 36822 too high, but sample code works
// 8445 too low whe doing columns first, which doesnt work for sample code

const areEq = (list1: string[], list2: string[]) => {
  const minLen = Math.min(list1.length, list2.length);
  const string1 = JSON.stringify(list1.slice(0, minLen));
  const string2 = JSON.stringify(list2.slice(0, minLen));
  const diffs = string1.split("").filter((char, i) => char !== string2[i]);
  return diffs.length === 1;
};

for (let pattern of patterns) {
  const rows = pattern.split("\n");
  let didAdd = false;
  const cols = rows[0]
    .split("")
    .map((_, x) => rows.map((row, i) => row[x]).join(""));

  for (let y = 1; y < rows.length; y++) {
    if (areEq(rows.slice(0, y).reverse(), rows.slice(y))) {
      sum += y * 100;
      didAdd = true;
      break;
    }
  }
  if (didAdd) continue;

  for (let x = 1; x < cols.length; x++) {
    if (areEq(cols.slice(0, x).reverse(), cols.slice(x))) {
      sum += x;
      break;
    }
  }
}

console.log(sum);
