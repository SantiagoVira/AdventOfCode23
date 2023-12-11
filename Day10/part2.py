import turtle
import json

with open("./Day10/python_coords.json") as f:
    pipes = json.load(f)

with open("./Day10/python_dots.json") as f:
    dots = json.load(f)

print(len(pipes) / 2)

turtle.tracer(0, 0)

bob = turtle.Turtle()
bob.ht()

bob.pu()
bob.goto(30 * 4-300, 119 * 4 - 300)
bob.pd()

bob.color("forestgreen", "limegreen")

bob.begin_fill()

for [x, y] in pipes:
    bob.goto(x*4-300, y*4-300)

bob.end_fill()

bob.color("red")
for [x, y] in dots:
    bob.pu()
    bob.goto(x*4-300, y*4-300)
    bob.pd()
    bob.dot(3)

turtle.mainloop()
