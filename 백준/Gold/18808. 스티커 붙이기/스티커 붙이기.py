import sys

input = sys.stdin.readline

n, m, k = map(int, input().split())

stickers = [[] for _ in range(k)]

for i in range(k):
  r, c = map(int, input().split())
  for j in range(r):
    stickers[i].append(list(map(int, input().split())))

# print(stickers)

board = [[False for _ in range(m)] for _ in range(n)]

# print(board)


def rotate(sticker, k):
  if k == 0:
    return sticker
  r = len(sticker)  # 3
  c = len(sticker[0])  # 2
  rotated = [[0 for _ in range(r)] for _ in range(c)]
  for i in range(len(sticker)):
    for j in range(len(sticker[0])):
      # i, j
      # 0, 0 -> 0, 2
      # 0, 1 -> 1, 2
      # 1, 0 -> 0, 1
      # 1, 1 -> 1, 1
      # 2, 0 -> 0, 0
      # 2, 1 -> 1, 0
      rotated[j][r-i-1] = sticker[i][j]

  return rotated


def can_stick(si, sj, sticker):
  sr = len(sticker)
  sc = len(sticker[0])
  for i in range(si, si+sr):
    for j in range(sj, sj+sc):
      if sticker[i-si][j-sj] == 1 and board[i][j]:
        return False
  return True


def stick(si, sj, sticker):
  sr = len(sticker)
  sc = len(sticker[0])
  for i in range(si, si+sr):
    for j in range(sj, sj+sc):
      if sticker[i-si][j-sj] == 1:
        board[i][j] = True


for sticker in stickers:
  sticked = False
  for k in range(4):
    sticker = rotate(sticker, k)
    for i in range(n):
      for j in range(m):
        if i + len(sticker) > n or j + len(sticker[0]) > m:
          continue
        if can_stick(i, j, sticker):
          stick(i, j, sticker)
          sticked = True
          break
      if sticked:
        break
    if sticked:
      break

count = 0
for i in range(n):
  for j in range(m):
    if board[i][j]:
      count += 1


print(count)
