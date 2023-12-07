import time
import copy
start_time = time.time()
i = 0

with open("./Day5/input.txt") as f:
    data = f.read()

categories = data.split("\n\n")
seeds = [int(num) for num in categories[0].split(" ")[1:]]
maps = categories[1:]
maps = [[[int(num) for num in line_of_nums.split(" ")] for line_of_nums in map.split("\n")
         if line_of_nums.strip().replace(" ", "").isnumeric()] for map in maps]


class Range:
    def __init__(self, source_start, source_end, dest_start, dest_end):
        self.source_start = source_start
        self.source_end = source_end
        self.dest_start = dest_start
        self.dest_end = dest_end

    def contains(self, num):
        return self.source_start < num < self.source_end

    def __str__(self):
        return f"Source from {self.source_start} to {self.source_end}\nDestination from {self.dest_start} to {self.dest_end}"

    def copy(self):
        return Range(self.source_start, self.source_end, self.dest_start, self.dest_end)


ranges = [Range(44187305, 149850000, 44187305, 149850000)]

for m in maps:
    new_ranges = []
    for line in m:

        source = [line[1], line[1] + line[2]]
        dest = [line[0], line[0] + line[2]]
        for r in ranges:
            i += 1
            if r.contains(source[0]):
                if r.contains(source[1]):
                    # if "source" range in the line from the map is completely inside of one of the ranges in ranges array
                    new_ranges.append(
                        Range(r.source_start, source[0], r.source_start, source[0]))
                    new_ranges.append(Range(*source, *dest))
                    new_ranges.append(
                        Range(source[1], r.source_end, source[1], r.source_end))
                else:
                    # if "source" range in the line from the map overlaps one of the ranges in ranges array from its right side
                    new_ranges.append(
                        Range(r.source_start, source[0], r.source_start, source[0]))
                    new_ranges.append(
                        Range(source[0], r.source_end, dest[0], dest[1]-(source[1] - r.source_end)))

                break
            elif r.contains(source[1]):
                # if "source" range in the line from the map overlaps one of the ranges in ranges array from its left side
                new_ranges.append(
                    Range(r.source_start, source[1], dest[0] + (r.source_start - source[0]), dest[1]))
                new_ranges.append(
                    Range(source[1], r.source_end, source[1], r.source_end))

                break

    print(new_ranges)
    ranges = [item.copy() for item in new_ranges]

print(ranges)

print("Ran in", 1000 * (time.time() - start_time), "ms, iterated", i, "times")
