import sys

input = sys.stdin.readline

n, m = map(int, input().split())


class TrieNode:
  def __init__(self):
    self.children = dict()
    self.is_end = False


root = TrieNode()
count = 0

for i in range(n):
  word = input().strip()
  node = root
  for _, char in enumerate(word):
    if char not in node.children:
      node.children[char] = TrieNode()
    node = node.children[char]
  node.is_end = True


for i in range(m):
  word = input().strip()
  node = root
  for j, char in enumerate(word):  # b a e k j o o n
    if char not in node.children:
      break
    node = node.children[char]

    if j == len(word)-1 and node.is_end:
      count += 1
      break

print(count)