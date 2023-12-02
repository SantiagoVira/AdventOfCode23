from functools import reduce

with open("./Day1/input.txt") as f:
    data = f.readlines()

summ = 0

for line in data:
    pairs = {'one': '1', 'two': '2', 'three': '3', 'four': '4', 'five':
             '5', 'six': '6', 'seven': '7', 'eight': '8', 'nine': '9'}
    # new_line = line.replace('one', '1').replace('two', '2').replace('three', '3').replace('four', '4').replace('five',
    #                                                                                                           '5').replace('six', '6').replace('seven', '7').replace('eight', '8').replace('nine', '9')

    new_line = ""

    for i in range(len(line)):
        for numName, numVal in pairs.items():
            if line[i:i+len(numName)] == numName:
                new_line += numVal
                i += len(numName) - 1
                break

        new_line += line[i]

    # if new_line != line:
    #     print(line, new_line)

    digits = [char for char in new_line if char.isnumeric()]
    summ += int(digits[0] + digits[-1])

print(summ)
