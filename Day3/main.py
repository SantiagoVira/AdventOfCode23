import re

with open("./Day3/input.txt") as f:
    data = [line.strip() for line in f.readlines()]


def safeSearch(text, index):
    if 0 <= index < len(text):
        return text[index]
    else:
        # print(index, len(text), text)
        return ""


def matchSym(text):
    return re.search("[^\d.]", text)


def matchNum(text):
    return re.search("\d", text)


def safeMatchSym(text, idx):
    return matchSym(safeSearch(text, idx))


def safeMatchNum(text, idx):
    return matchNum(safeSearch(text, idx))


summ = 0

# for lineNum, line in enumerate(data):
#     # Find the numbers
#     # their indicies
#     # their lengths

#     # Search in the indicies right and left and all above and below
#     # Make sure to account for literal edge cases
#     # Search for non . non numeric characters

#     nums = [
#         {
#             "value": int(num.group(0).strip()),
#             "start": num.start(),
#             "end": num.end()
#         }
#         for num in re.finditer("\d+", line)
#     ]

#     # print(nums)

#     for i, num in enumerate(nums):
#         if (
#             safeMatchSym(line, num["start"] -
#                          1) or safeMatchSym(line, num["end"])
#         ) or (
#             lineNum != 0 and (matchSym(data[lineNum - 1][num["start"]: num["end"]]) or safeMatchSym(
#                 data[lineNum - 1], num["start"] - 1) or safeMatchSym(data[lineNum - 1], num["end"]))
#         ) or (
#             lineNum != len(data) - 1 and (matchSym(data[lineNum + 1][num["start"]: num["end"]]) or safeMatchSym(
#                 data[lineNum + 1], num["start"] - 1) or safeMatchSym(data[lineNum + 1], num["end"]))
#         ):
#             summ += num["value"]
#         else:
#             print(num)


all_gears = {}


def add_gear(x, lineNum, val):
    key = f"{x},{lineNum}"
    if key in all_gears:
        all_gears[key].append(val)
    else:
        all_gears[key] = [val]


# 77509019
for lineNum, line in enumerate(data):
    nums = [
        {
            "value": int(num.group(0).strip()),
            "start": num.start(),
            "end": num.end()
        }
        for num in re.finditer("\d+", line)
    ]

    for num in nums:
        if lineNum != 0:
            if safeSearch(data[lineNum-1], num["start"] - 1) == "*":
                add_gear(num["start"] - 1, lineNum - 1, num["value"])
            if safeSearch(data[lineNum-1], num["end"]) == "*":
                add_gear(num["end"], lineNum - 1, num["value"])

            for charIdx, char in enumerate(data[lineNum-1][num["start"]: num["end"]]):
                if char == "*":
                    add_gear(num["start"] + charIdx, lineNum - 1, num["value"])

        if safeSearch(line, num["start"] - 1) == "*":
            add_gear(num["start"] - 1, lineNum, num["value"])
        if safeSearch(line, num["end"]) == "*":
            add_gear(num["end"], lineNum, num["value"])

        if lineNum != len(data) - 1:
            if safeSearch(data[lineNum+1], num["start"] - 1) == "*":
                add_gear(num["start"] - 1, lineNum + 1, num["value"])
            if safeSearch(data[lineNum+1], num["end"]) == "*":
                add_gear(num["end"], lineNum + 1, num["value"])

            for charIdx, char in enumerate(data[lineNum+1][num["start"]: num["end"]]):
                if char == "*":
                    add_gear(num["start"] + charIdx, lineNum + 1, num["value"])

for gear in all_gears.values():
    if len(gear) == 2:
        summ += gear[0] * gear[1]


print(summ)
