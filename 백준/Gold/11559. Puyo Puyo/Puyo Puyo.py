import sys
from collections import deque

input = sys.stdin.readline

# 12개 줄

field = []

for _ in range(12):
  line = input().strip()
  field.append(list(line))

dr = [0, 1, -1, 0]
dc = [1, 0, 0, -1]


# def dfs(r, c, a, depth, visited):
#   print('dfs', r, c)
#   visited[r][c] = True
#   field[r][c] = '.'
#   if depth == 10:
#     return depth
#   for i in range(4):
#     nr = r + dr[i]
#     nc = c + dc[i]
#     if nr < 0 or nc < 0 or nr >= 12 or nc >= 6:
#       continue
#     if field[nr][nc] == '.':
#       continue
#     if visited[nr][nc]:
#       continue
#     if field[nr][nc] == a:
#       field[nr][nc] = '.'
#       depth = dfs(nr, nc, a, depth+1, visited)
#       # return dfs(nr, nc, a, depth+1, visited)
#       # print(ret, r, c)
#       # if depth < 4:
#       #   field[nr][nc] = a
#       break

#   if depth < 4:
#     field[r][c] = a
#   return depth


def bfs(sr, sc, visited, a):
  q = deque([(sr, sc)])
  cnt = 0
  dr = [0, 1, -1, 0]
  dc = [1, 0, 0, -1]
  visited[sr][sc] = True
  while q:
    r, c = q.popleft()
    field[r][c] = '-'
    cnt += 1

    for i in range(4):
      nr = r + dr[i]
      nc = c + dc[i]
      if nr < 0 or nc < 0 or nr >= 12 or nc >= 6:
        continue
      if visited[nr][nc]:
        continue
      if field[nr][nc] != a:
        continue
      visited[nr][nc] = True
      q.append((nr, nc))

  return cnt


def reset_bfs(sr, sc, a):
  q = deque([(sr, sc)])
  visited = [[False] * 6 for _ in range(12)]
  dr = [0, 1, -1, 0]
  dc = [1, 0, 0, -1]
  field[sr][sc] = a
  while q:
    r, c = q.popleft()
    field[r][c] = a

    for i in range(4):
      nr = r + dr[i]
      nc = c + dc[i]
      if nr < 0 or nc < 0 or nr >= 12 or nc >= 6:
        continue
      if visited[nr][nc]:
        continue
      if field[nr][nc] != '-':
        continue
      visited[nr][nc] = True
      q.append((nr, nc))


answer = 0
while True:
  is_end = True
  visited = [[False] * 6 for _ in range(12)]

  # 모두 순회하면서 없애기
  for r in range(12):
    for c in range(6):
      if field[r][c] == '.':
        continue
      if visited[r][c]:
        continue
      a = field[r][c]
      cnt = bfs(r, c, visited, a)
      # cnt = dfs(r, c, field[r][c], 1, visited)
      # print(r, c, cnt)
      if cnt < 4:
        reset_bfs(r, c, a)
      else:
        reset_bfs(r, c, '.')
      # for i in range(12):
      #   print(field[i])
      # for i in range(12):
      #   print(visited[i])
      if cnt >= 4 and is_end:
        answer += 1
        is_end = False
  # for i in range(12):
  #   print(visited[i])
  if is_end:
    # print('end')
    break

  # print('===========down===========')
  # 중력내리기
  for i in range(12-2, -1, -1):
    for j in range(6):
      if field[i][j] == '.':
        continue

      if field[i+1][j] == '.':
        r = i
        while r <= 10 and field[r+1][j] == '.':
          field[r+1][j] = field[r][j]
          field[r][j] = '.'
          r += 1

    # for i in range(12):
    #   print(field[i])
    # print()

  # for i in range(12):
  #   print(field[i])

print(answer)

"""
같은 색 뿌요가 4개 이상 상하좌우로 연결되어 있으면 연결된 같은 색 뿌요들이 한꺼번에 없어진다.

"""
