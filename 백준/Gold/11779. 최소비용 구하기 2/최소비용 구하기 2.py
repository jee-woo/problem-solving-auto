import sys
import heapq

input = sys.stdin.readline

n = int(input())
m = int(input())
INF = int(1e9)

graph = [[] for _ in range(n + 1)]

# print(dist)

for _ in range(m):
  s, e, cost = map(int, input().split())
  graph[s].append((e, cost))

start, end = map(int, input().split())

# print(graph)


def dijkstra(start, end):
  dist = [INF for _ in range(n + 1)]
  dist[start] = 0

  visited = [False for _ in range(n + 1)]
  q = []
  heapq.heappush(q, (0, start))
  path = [-1 for _ in range(n + 1)]

  while q:
    cost, now = heapq.heappop(q)
    if visited[now]:
      continue
    visited[now] = True
    for next, nc in graph[now]:
      if cost + nc < dist[next]:
        dist[next] = cost + nc
        heapq.heappush(q, (dist[next], next))
        path[next] = now
  # print(dist)
  # print(path)

  cur = end
  stack = [end]
  while start != cur:
    cur = path[cur]
    stack.append(cur)
  length = len(stack)

  # print(stack)
  answer = ''
  while stack:
    answer += str(stack.pop()) + ' '

  print(dist[end])
  print(length)
  print(answer)


dijkstra(start, end)
