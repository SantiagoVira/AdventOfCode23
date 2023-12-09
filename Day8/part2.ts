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

const nodes = Object.keys(network).filter((k) => k.endsWith("A"));
const LRtoIdx = (x: string) => (x === "L" ? 0 : 1);

const lengths: number[] = [];

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

  lengths.push(loop_len);
}

const lcm = (...arr) => {
  const gcd = (x, y) => (!y ? x : gcd(y, x % y));
  const _lcm = (x, y) => (x * y) / gcd(x, y);
  return [...arr].reduce((a, b) => _lcm(a, b));
};

console.log(lcm(...lengths));
