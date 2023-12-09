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
const nodes = Object.keys(network).filter((k) => k.endsWith("A"));
const LRtoIdx = (x: string) => (x === "L" ? 0 : 1);

for (let n of nodes) {
  let node = n;
  let count = 0;

  let loop_len = 0;

  while (true) {
    const new_node = network[node][LRtoIdx(seq[count % seq.length])];
    node = new_node;
    count += 1;
    if (new_node.endsWith("Z")) {
      loop_len = count;
      break;
    }
  }
  console.log(loop_len);
}

// while (true) {
//   const dir = seq[count % seq.length];
//   let isDone = true;

//   console.log(nodes, dir, LRtoIdx(dir));

//   for (let i = 0; i < nodes.length; i++) {
//     nodes[i] = network[nodes[i]][LRtoIdx(dir)];
//     if (!nodes[i].endsWith("Z")) isDone = false;
//   }
//   count += 1;

//   if (isDone) break;
// }

console.log(count);
