import sys
from collections import deque

input = sys.stdin.readline

k = int(input())


def solution():
  V, E = map(int, input().split())
  graph = [[] for _ in range(V+1)]  # 1-based indexed

  for _ in range(E):
    u, v = map(int, input().split())
    graph[u].append(v)
    graph[v].append(u)

  bi = [None for _ in range(V+1)]
  bi[1] = 0
  q = deque()
  visited = [False] * (V+1)

  for i in range(1, V+1):
    if visited[i]:
      continue
    q.append(i)
    visited[i] = True
    """
    6-5
    \ |
			4
    3
    |
    1-2
    """

    while q:
      now = q.popleft()
      # print('now', now)

      for i in graph[now]:
        if visited[i]:
          if i != now and bi[i] == bi[now]:
            # print(i, now, bi)
            return 'NO'
          continue
        q.append(i)
        bi[i] = 1 if bi[now] == 0 else 0
        visited[i] = True

  # print(bi)
  return 'YES'


for i in range(k):
  print(solution())
