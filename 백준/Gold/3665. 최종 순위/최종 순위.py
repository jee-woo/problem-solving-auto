import sys
from collections import deque

input = sys.stdin.readline

t = int(input())

for i in range(t):
  n = int(input())
  last_year = [0] * (n + 1)
  teams = list(map(int, input().split()))

  for i in range(n):
    last_year[teams[i]] = i + 1  # teams[i]팀은 i+1등
  m = int(input())

  if m == 0:
    print(' '.join(map(str, teams)))
    continue

  graph = [[] for _ in range(n + 1)]
  indegree = [0] * (n + 1)

  visited = [[False] * (n+1) for _ in range(n+1)]

  for i in range(m):
    a, b = map(int, input().split())
    if last_year[a] < last_year[b]:
      graph[b].append(a)
      visited[b][a] = True
      indegree[a] += 1
    else:
      graph[a].append(b)
      visited[a][b] = True
      indegree[b] += 1

  for i in range(1, n + 1):
    for j in range(i + 1, n + 1):
      if visited[i][j] == False and visited[j][i] == False:
        if last_year[i] < last_year[j]:
          graph[i].append(j)
          indegree[j] += 1
        else:
          graph[j].append(i)
          indegree[i] += 1

  result = []
  q = deque()

  for i in range(1, n + 1):
    if indegree[i] == 0:
      q.append(i)

  while q:
    now = q.popleft()
    result.append(str(now))
    for i in graph[now]:
      indegree[i] -= 1
      if indegree[i] == 0:
        q.append(i)

  if len(result) != n:
    print('IMPOSSIBLE')
    continue
  if not result:
    print('IMPOSSIBLE')
    continue

  print(' '.join(result))
