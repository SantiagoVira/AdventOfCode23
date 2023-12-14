import fs from "fs";

const data = fs.readFileSync("./input.txt", "utf-8").split("\n");

const patterns = data
  .map((line) => line.split(" "))
  .map(([record, nums]) => {
    return { record, nums: nums.split(",").map((num) => parseInt(num)) };
  });

for (let pattern of patterns) {
  const record = pattern.record.split(".").filter((chunk) => chunk);
  console.log(record, pattern.nums);

  /* 
  
  For ???? [1, 1]
  - amountOfSpaces = questionMarkBlob.length - nums.length + 1 = 3
  - amountOfSpaces CHOOSE nums.length = 3

  For ??? [1, 1]
  - amountOfSpaces = questionMarkBlob.length - nums.length + 1 = 2
  - amountOfSpaces CHOOSE nums.length = 1

  For ?? [1]
  - amountOfSpaces = questionMarkBlob.length - nums.length + 1 = 2
  - amountOfSpaces CHOOSE nums.length = 2


  For ????? [1, 2]
  - amountOfSpaces = questionMarkBlob.length - nums.length + 1 = 4
  - amountOfSpaces CHOOSE nums.length = 6

  */
}
