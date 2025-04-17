import sys

input = sys.stdin.readline

w = int(input())

words = [None] * w

for i in range(w):
  words[i] = input().strip()

input()

# class TrieNode:
#   def __init__(self):
#     self.children = dict()
#     self.is_end = False

points = {
    1: 0,
    2: 0,
    3: 1,
    4: 1,
    5: 2,
    6: 3,
    7: 5,
    8: 11
}

dx = [-1, -1, -1, 0, 0, 1, 1, 1]
dy = [-1, 0, 1, -1, 1, -1, 0, 1]


def dfs(i, j, word, depth, visited):
  if board[i][j] != word[depth]:
    # print(word, depth, word[depth], board[i][j], len(word)-1)
    return False
  if depth == len(word)-1:
    # print('return', word)
    return True
  for di in range(8):
    nx = i + dx[di]
    ny = j + dy[di]
    if nx < 0 or ny < 0 or nx >= 4 or ny >= 4:
      continue
    if visited[nx][ny]:
      continue
    visited[nx][ny] = True
    found = dfs(nx, ny, word, depth+1, visited)
    visited[nx][ny] = False
    if found:
      return True

  return False


def solution(board):
  # print(board)
  point = 0
  max_word = ''
  count = 0

  for word in words:
    visited = [[False] * 4 for _ in range(4)]

    start = word[0]
    # print('word', word)
    found = False
    for i in range(4):
      for j in range(4):
        if start == board[i][j]:
          # print(start, i, j)
          visited[i][j] = True
          found = dfs(i, j, word, 0, visited)
          visited[i][j] = False

          if found:
            break
      if found:
        break
    if found:
      # print('found', word)
      point += points[len(word)]
      count += 1
      if len(word) > len(max_word):
        max_word = word
      elif len(word) == len(max_word) and word < max_word:
        max_word = word

    # for i in len(word):

  print(point, max_word, count)


b = int(input())

# boards = [[None for _ in range(4)] for _ in range(b)]
board = [None for _ in range(4)]

for i in range(b):
  for j in range(4):
    board[j] = input().strip()
    # boards[i][j] = input().strip()
  if i < b-1:
    input()
  solution(board)
