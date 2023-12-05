import gc

with open("./Day5/input.txt") as f:
    data = f.read()

categories = data.split("\n\n")
seeds = categories[0]
maps = categories[1:]
maps = [[[int(num) for num in line_of_nums.split(" ")] for line_of_nums in map.split("\n")
         if line_of_nums.strip().replace(" ", "").isnumeric()] for map in maps]

translations = set()

ranges = []

# for i, num in enumerate(seeds.split(" ")[1:]):
#     if i % 2 == 0:
#         start = int(num)
#         end = int(num) + int(seeds.split(" ")[1:][i+1])
#         did_join = False
#         for r_idx, r in enumerate(ranges):
#             if r[0] < start < r[1] and not (r[0] < end < r[1]):
#                 ranges[r_idx][1] = end
#                 did_join = True
#                 break
#             elif not (r[0] < start < r[1]) and (r[0] < end < r[1]):
#                 ranges[r_idx][0] = start
#                 did_join = True
#                 break
#             elif r[0] < start < r[1] and r[0] < end < r[1]:
#                 did_join = True
#                 break

#         if not did_join:
#             ranges.append([start, end])


# for i, num in enumerate(seeds.split(" ")[1:]):
#     if i % 2 == 0:
#         start = int(num)
#         end = int(num) + int(seeds.split(" ")[1:][i+1])
#         ranges.append(range(start, end))


translations = [int(num.strip())
                for num in seeds.split(" ") if num.strip().isnumeric()]

for map_idx, map in enumerate(maps):
    for i, num in enumerate(translations):
        for line in map:
            if num in range(line[1], line[1] + line[2]):
                translations[i] = line[0] + (num - line[1])
                break

print(min(translations))
