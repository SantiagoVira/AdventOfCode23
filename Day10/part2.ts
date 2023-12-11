import fs from "fs";

const data = fs.readFileSync("./input.txt", "utf-8").split("\n");
const START = [30, 119];

// Path starts going left
let cell = data[START[0]][START[1] - 1];
const cell_coords = [START[0], START[1] - 1];
let steps = 1;
let dir_just_moved = "L";

const all_coords = [`${START[0]}, ${START[1] - 1}`];
const pythonCoords = [[START[0], START[1] - 1]];
const pythonDots: number[][] = [];

// console.log(
//   data
//     .map((line) => (line.match(new RegExp("\\.", "g")) ?? "").length)
//     .reduce((a, b) => a + b)
// );

// Less than 19600
// <= 596
// <= 73

const move_cell = (dir: "U" | "L" | "R" | "D") => {
  dir_just_moved = dir;
  steps++;
  switch (dir) {
    case "U":
      cell_coords[0]--;
      break;
    case "L":
      cell_coords[1]--;
      break;
    case "R":
      cell_coords[1]++;
      break;
    case "D":
      cell_coords[0]++;
      break;
    default:
      console.log(dir);
  }
  cell = data[cell_coords[0]][cell_coords[1]];
  all_coords.push(`${cell_coords[0]}, ${cell_coords[1]}`);
  pythonCoords.push(cell_coords.map((x) => x));
};

while (cell !== "S") {
  switch (cell) {
    case "-":
      move_cell(dir_just_moved === "L" ? "L" : "R");
      break;
    case "|":
      move_cell(dir_just_moved === "U" ? "U" : "D");
      break;
    case "L":
      move_cell(dir_just_moved === "L" ? "U" : "R");
      break;
    case "J":
      move_cell(dir_just_moved === "D" ? "L" : "U");
      break;
    case "7":
      move_cell(dir_just_moved === "R" ? "D" : "L");
      break;
    case "F":
      move_cell(dir_just_moved === "U" ? "R" : "D");
      break;
    default:
      console.log(cell);
  }
}

// console.log(all_coords);

fs.writeFileSync("./hacky.txt", "");
for (let y = 0; y < 140; y++) {
  for (let x = 0; x < 140; x++) {
    const hacky = fs.readFileSync("./hacky.txt", "utf-8").split("\n");
    let valToWrite;

    if (data[y][x] === ".") {
      pythonDots.push([y, x]);
    }

    if (all_coords.includes(`${y}, ${x}`)) {
      valToWrite = data[y][x];
    } else if (data[y][x] === "." && hacky[y].slice(0, x).match("[-|FJL7]")) {
      valToWrite = ".";
    } else {
      valToWrite = " ";
    }

    fs.appendFileSync("./hacky.txt", valToWrite);
  }
  fs.appendFileSync("./hacky.txt", "\n");
}

const hacky = fs.readFileSync("./hacky.txt", "utf-8").split("\n");
let new_hacky = "";

for (let y = 0; y < 140; y++) {
  for (let x = 0; x < 140; x++) {
    if (!hacky[y].slice(x).match("[-|FJL7]")) {
      break;
    }

    if (hacky[y][x] !== ".") {
      new_hacky += hacky[y][x];
    } else if (
      hacky
        .slice(y)
        .map((line) => line[x])
        .join("")
        .match("[-|FJL7]") &&
      hacky
        .slice(0, y)
        .map((line) => line[x])
        .join("")
        .match("[-|FJL7]")
    ) {
      new_hacky += hacky[y][x];
    }
  }
  new_hacky += "\n";
}

fs.writeFileSync("./hacky.txt", new_hacky);
fs.writeFileSync("./python_coords.json", JSON.stringify(pythonCoords));
fs.writeFileSync("./python_dots.json", JSON.stringify(pythonDots));
