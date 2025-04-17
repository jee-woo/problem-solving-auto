import sys

input = sys.stdin.readline

t = int(input())


class TrieNode:
  def __init__(self):
    self.children = [None] * 10
    self.is_end = False


def solution(n):
  nums = [None for _ in range(n)]
  root = TrieNode()
  for i in range(n):
    nums[i] = input().strip()
  for num in nums:
    node = root
    for i in range(len(num)):
      num_i = int(num[i])
      if node.children[num_i] is None:
        node.children[num_i] = TrieNode()
      node = node.children[num_i]

    node.is_end = True
  for num in nums:
    node = root
    for i in range(len(num)):
      num_i = int(num[i])
      if node.is_end:
        print("NO")
        return
      node = node.children[num_i]

  print("YES")


for _ in range(t):
  n = int(input())
  solution(n)
