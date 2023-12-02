with open("./Day1/input.txt") as f:
    data = f.readlines()

summ = 0

for line in data:
    # Comment out for original
    pairs = {'one': '1', 'two': '2', 'three': '3', 'four': '4', 'five':
             '5', 'six': '6', 'seven': '7', 'eight': '8', 'nine': '9'}
    new_line = ""

    for i in range(len(line)):
        for numName, numVal in pairs.items():
            if line[i:i+len(numName)] == numName:
                new_line += numVal
                i += len(numName) - 1
                break

        new_line += line[i]

    line = new_line
    ########

    digits = [char for char in line if char.isnumeric()]
    summ += int(digits[0] + digits[-1])

print(summ)
