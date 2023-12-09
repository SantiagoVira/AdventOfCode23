import fs from "fs";

const data = fs.readFileSync("./input.txt", "utf-8").split("\n");
const values = data.map((line) => line.split(" ").map((num) => parseInt(num)));

let summ = 0;

for (let val of values) {
  // Val represents a value over time, one line of the puzzle input
  const diffs: number[][] = [val];
  let last_diff_row_no_dupes: number[] = [];

  do {
    const prev_round = diffs[diffs.length - 1];
    const new_round: number[] = [];
    for (let i = 1; i < prev_round.length; i++) {
      new_round.push(prev_round[i] - prev_round[i - 1]);
    }

    diffs.push(new_round);

    last_diff_row_no_dupes = prev_round.filter(
      (num, idx) => prev_round.indexOf(num) === idx
    );
  } while (
    !(last_diff_row_no_dupes.length === 1 && last_diff_row_no_dupes[0] === 0)
  );

  let delta = 0;
  for (let diff of diffs.reverse()) {
    // delta += diff[diff.length - 1];
    delta = diff[0] - delta;
  }
  summ += delta;
}

console.log(summ);
