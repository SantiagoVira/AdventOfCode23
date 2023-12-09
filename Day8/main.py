with open("./Day8/input.txt") as f:
    data = f.readlines()

seq = data[0]
raw_network = data[2:]
network = {node.split(" = ")[0]: node.split(
    " = ")[1].strip()[1:-1].split(", ") for node in raw_network}

count = 0
node = "AAA"


def LRtoIdx(x): return 0 if x == "L" else 1


while True:
    new_node = network[node][LRtoIdx(seq[count % len(seq)])]
    count += 1
    node = new_node
    if new_node == "ZZZ":
        break

print(count)
