import collections

with open("./Day7/input.txt") as f:
    data = [line.strip() for line in f.readlines()]

order = "AKQT98765432J"

typed_hands = {
    "five": [],
    "four": [],
    "full": [],
    "three": [],
    "twopair": [],
    "onepair": [],
    "high": []
}

for line in data:
    [hand, bid] = line.split(" ")
    bid = int(bid)

    most_common_letter = collections.Counter(hand).most_common()[0][0]
    new_hand = hand.replace("J", most_common_letter)

    if hand != new_hand:
        print(hand, new_hand)

    if len(set(new_hand)) == 1:
        typed_hands["five"].append((hand, bid))
    elif len(set(new_hand)) == 2:
        if new_hand.count(new_hand[0]) in [1, 4]:
            typed_hands["four"].append((hand, bid))
        else:
            typed_hands["full"].append((hand, bid))
    elif len(set(new_hand)) == 3:
        num_of_most_common = collections.Counter(new_hand).most_common()[0][1]
        if num_of_most_common == 3:
            typed_hands["three"].append((hand, bid))
        else:
            typed_hands["twopair"].append((hand, bid))
    elif len(set(new_hand)) == 4:
        typed_hands["onepair"].append((hand, bid))
    elif len(set(new_hand)) == 5:
        typed_hands["high"].append((hand, bid))

res = 0

rank = 1000


for hand_type, hands in typed_hands.items():
    sorted_hands = sorted(hands, key=lambda hand: [
                          order.index(c) for c in hand[0]])
    print(sorted_hands)
    for hand in sorted_hands:
        res += rank * hand[1]
        rank -= 1

print(res)

# Wrong: 248368409
