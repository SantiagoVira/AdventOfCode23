import gc

with open("./Day5/input.txt") as f:
    data = f.read()

categories = data.split("\n\n")
seeds = categories[0]
maps = categories[1:]
maps = [[[int(num) for num in line_of_nums.split(" ")] for line_of_nums in map.split("\n")
         if line_of_nums.strip().replace(" ", "").isnumeric()] for map in maps]

ranges = []

for i, num in enumerate(seeds.split(" ")[1:]):
    if i % 2 == 0:
        start = int(num)
        end = int(num) + int(seeds.split(" ")[1:][i+1])
        ranges.append(range(start, end))

# print(sorted(list(set([int(num.strip())
#       for num in data.split() if num.isnumeric()]))))

# translations = [int(num.strip())
#                 for num in seeds.split(" ") if num.strip().isnumeric()]

# finals = []

# for r in ranges:
#     translations = []
#     for num in r:
#         for line in maps[0]:
#             if num in range(line[1], line[1] + line[2]):
#                 translations.append(line[0] + (num - line[1]))
#                 break

#     for map_idx, map in enumerate(maps[1:]):
#         for i, num in enumerate(translations):
#             for line in map:
#                 if num in range(line[1], line[1] + line[2]):
#                     translations[i] = line[0] + (num - line[1])
#                     break

#     print(min(translations))
#     finals.append(min(translations))
#     print(finals)

translations = [*range(44187305, 149850000)]
# 149850000
print(len(translations))

for map_idx, map in enumerate(maps):
    for i, num in enumerate(translations):
        for line in map:
            if num in range(line[1], line[1] + line[2]):
                translations[i] = line[0] + (num - line[1])
                break

print(min(translations))

# highest number
# should be less than
# Upper bound:  149850000
# Highest seed: 3400626717
# input seeds: (44187305, 192909754)
# Wrong: 231522441

print(max([int(num) for num in seeds.split(" ")[1:] if int(num) < 149850000]))
starts = [int(num) for i, num in enumerate(seeds.split(" ")[1:]) if i % 2 == 0]
ends = [starts[i // 2] + int(num)
        for i, num in enumerate(seeds.split(" ")[1:]) if i % 2 == 1]
print([pair for pair in list(zip(starts, ends)) if pair[0] < 149850000])

for num in range(349850000, 4277972007):
    inpt = num
    exists = True

    if num % 10000 == 0:
        print(f"starting #{num}")

    for map in maps[::-1]:
        for line in map:
            if inpt in range(line[0], line[0] + line[2]):
                inpt = line[1] + (inpt - line[0])
                break
            elif inpt in range(line[1], line[1] + line[2]):
                exists = False
                break

        if not exists:
            break

    is_over = False

    if exists:
        for r in ranges:
            if inpt in r:
                print(num)
                is_over = True
                break

    if is_over:
        break
