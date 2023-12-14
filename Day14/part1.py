with open("./Day14/input.txt") as f:
    data = [line.strip() for line in f.readlines()]

cols = [[line[colNum] for line in data] for colNum in range(len(data[0]))]

count = 0

for col in cols:
    lastStop = -1
    for i in range(len(cols)):
        if col[i] == "O":
            col.insert(lastStop + 1, col.pop(i))
        elif col[i] == "#":
            lastStop = i

for col in cols:
    for i, char in enumerate(col):
        if char == "O":
            count += len(col) - i

print(count)
