with open("./Day2/input.txt") as f:
    data = f.readlines()

summ = 0

limits = {
    "red": 12,
    "green": 13,
    "blue": 14
}

# for line in data:
#     first_split = line.split(':')

#     possible = True
#     for group in first_split[1].split(";"):
#         for batch in group.split(", "):
#             split_batch = batch.strip().split()
#             if int(split_batch[0]) > limits[split_batch[1]]:
#                 possible = False
#                 break

#         if not possible:
#             break

#     if possible:
#         summ += int(first_split[0][5:])

for line in data:
    first_split = line.split(':')

    maxs = {
        "red": 0,
        "green": 0,
        "blue": 0
    }

    for group in first_split[1].split(";"):
        for batch in group.split(", "):
            split_batch = batch.strip().split()
            amount = int(split_batch[0])
            color = split_batch[1]

            maxs[color] = max(maxs[color], amount)

    summ += maxs["red"] * maxs["green"] * maxs["blue"]

print(summ)
