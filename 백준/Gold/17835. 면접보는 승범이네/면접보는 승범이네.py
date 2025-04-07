import sys
import heapq

input = sys.stdin.readline

n, m, k = map(int, input().split())

graph = [[] for _ in range(n+1)]

for i in range(m):
  u, v, c = map(int, input().split())
  graph[v].append((u, c))

centers = map(int, input().split())

INF = sys.maxsize

q = []
dist = [INF for _ in range(n+1)]

center_set = set()


def dijkstra():
  max_i = INF
  max_dist = INF
  # print(center_set)
  while q:
    now_dist, now = heapq.heappop(q)
    if dist[now] < now_dist:
      continue

    for v, c in graph[now]:
      if v in center_set:
        continue
      next_dist = now_dist + c
      if next_dist < dist[v]:
        heapq.heappush(q, (next_dist, v))
        dist[v] = next_dist

  # print(dist)
  max_dist = 0
  max_i = 0
  for i in range(1, n+1):
    if max_dist < dist[i]:
      max_dist = dist[i]
      max_i = i
  print(max_i)
  print(max_dist)


for center in centers:
  center_set.add(center)
  heapq.heappush(q, (0, center))
  dist[center] = 0

dijkstra()
