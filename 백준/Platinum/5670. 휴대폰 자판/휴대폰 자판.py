import sys

# input = sys.stdin.readline

# children이 하나만 있으면 바로 입력


class TrieNode:
  def __init__(self):
    self.children = dict()
    self.is_end = False


lines = sys.stdin.readlines()
# print(lines)
l = 0
while l < len(lines):
  n = int(lines[l])
  l += 1
  words = [None for _ in range(n)]

  root = TrieNode()

  for i in range(n):
    words[i] = lines[l].strip()
    l += 1
    word = words[i]
    node = root
    for j in range(len(word)):
      if word[j] not in node.children:
        node.children[word[j]] = TrieNode()
      node = node.children[word[j]]
    node.is_end = True

  # print(words)
  # words 순회
  count_sum = 0
  for word in words:
    count = 1
    node = root
    for i in range(len(word)):
      # if word[i] in node.children:
      if len(node.children) > 1 and i > 0 or node.is_end:
          # node = node.children[word[i]]
        count += 1
      node = node.children[word[i]]
      # else:
      #   print(count)
      #   count += (len(word) - i) - 1
      #   break
    # print(word, count)
    count_sum += count
  print(f"{count_sum / n:.2f}")
  # print(root.children)
