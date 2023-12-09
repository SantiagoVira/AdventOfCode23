import fs from "fs";

const data = fs.readFileSync("./input.txt", "utf-8").split("\n");

const seq = data[0];
const raw_network = data.slice(2);
const network = {};

for (const node of raw_network) {
  network[node.split(" = ")[0]] = node
    .split(" = ")[1]
    .trim()
    .slice(1, -1)
    .split(", ");
}

let count = 0;
let node = "AAA";
const LRtoIdx = (x: string) => (x === "L" ? 0 : 1);

while (true) {
  const new_node = network[node][LRtoIdx(seq[count % seq.length])];
  node = new_node;
  count += 1;
  if (new_node === "ZZZ") break;
}

console.log(count);
