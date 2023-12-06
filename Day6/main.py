import math

with open("./Day6/input.txt") as f:
    data = f.readlines()

# times = [35, 69, 68, 87]
# dists = [213, 1168, 1086, 1248]

# prod = 1

# for t, d in zip(times, dists):
#     num_ways = 0
#     for i in range(t + 1):
#         if (t - i) * i > d:
#             num_ways += 1

#     prod *= num_ways

# print(prod)


#      30487061
time = 35696887
dist = 213116810861248

# time = 71530

# dist = 940200


num_ways = 0

# (time - x)x - dist
# -x^2 + xt - dist

# plus = (-time + (time**2 + 4 * dist)**0.5) / (-2)
# minus = (-time - (time**2 + 4 * dist)**0.5) / (-2)

# print(plus, minus)


# print(time - abs(math.floor(plus)))
# print(71556 - 71503)

num_ways = 0
for i in range(time + 1):
    if (time - i) * i > dist:
        num_ways += 1

print(num_ways)
