import fs from "fs";

const data = fs.readFileSync("./input.txt", "utf-8").split("\n");
const START = [30, 119];

// Path starts going left
let cell = data[START[0]][START[1] - 1];
const cell_coords = [START[0], START[1] - 1];
let steps = 1;
let dir_just_moved = "L";

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

console.log(steps / 2);
