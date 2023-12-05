with open("./Day4/input.txt") as f:
    data = [line.strip() for line in f.readlines()]

summ = 0

counts = {
    num: 1 for num in range(1, 202)
}

for cardNum, line in enumerate(data):
    lists = line[10:].split("|")
    winning = [int(num.strip())
               for num in lists[0].split(" ") if num.isnumeric()]
    has = [int(num.strip()) for num in lists[1].split(" ") if num.isnumeric()]

    overlap = len(list(x for x in winning if x in has))

    for i in range(cardNum + 2, cardNum + overlap + 2):
        counts[i] += counts[cardNum + 1]

    # if overlap > 0:
    #     summ += 2 ** (overlap - 1)


print(sum(counts.values()))
