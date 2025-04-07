import sys
sys.setrecursionlimit(100000)

input = sys.stdin.readline


class Node:
  def __init__(self, value):
    self.value = value
    self.left = None
    self.right = None


def insert(root, v):
  if root is None:
    return Node(v)
  if v < root.value:
    root.left = insert(root.left, v)
  elif v > root.value:
    root.right = insert(root.right, v)
  return root


root = None

while True:
  v = input()
  if not v:
    break
  v = int(v)
  root = insert(root, v)

answer = []


def postorder(v):
  if v is None:
    return
  postorder(v.left)
  postorder(v.right)
  answer.append(str(v.value))


postorder(root)

print('\n'.join(answer))
