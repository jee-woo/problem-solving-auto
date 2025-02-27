import heapq
import sys

input = sys.stdin.readline
INF = int(1e9)

n, m, x = map(int, input().split())

graph = [[] for _ in range(n + 1)]

for i in range(m):
  s, e, t = map(int, input().split())
  graph[s].append((e, t))
# print(graph)

# print(dist)

# X -> 마을


def dijkstra(node):
  visited = [False for _ in range(n + 1)]
  q = []
  heapq.heappush(q, (0, node))
  dist = [INF for _ in range(n + 1)]
  dist[node] = 0

  while q:
    d, now = heapq.heappop(q)
    if visited[now]:
      continue
    visited[now] = True

    for next, nd in graph[now]:
      if d + nd < dist[next]:
        dist[next] = d + nd
        heapq.heappush(q, (dist[next], next))

  return dist


distFromX = dijkstra(x)

# X아닌 마을 -> X
max_dist = 0
for i in range(1, n + 1):
  if i == x:
    continue
  distFromI = dijkstra(i)
  max_dist = max(distFromX[i] + distFromI[x], max_dist)

print(max_dist)
