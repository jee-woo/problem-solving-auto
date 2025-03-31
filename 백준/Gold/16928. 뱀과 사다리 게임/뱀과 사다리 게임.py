import sys
from collections import deque
input = sys.stdin.readline

n, m = map(int, input().split())

graph = [[] for _ in range(101)]

slide = [None for _ in range(101)]

for _ in range(n+m):
  x, y = map(int, input().split())
  slide[x] = y

for i in range(101):
  for k in range(1, 7):
    if i+k <= 100 and slide[i+k]:
      graph[i].append(slide[i+k])
    elif i+k <= 100:
      graph[i].append(i+k)

# print(graph)

q = deque()
q.append((1, 0))
visited = [False for _ in range(101)]

while q:
  now, count = q.popleft()
  if now == 100:
    print(count)
    # print(road)
    break
  for next in graph[now]:
    if next > 100:
      continue
    if visited[next]:
      continue
    q.append((next, count+1))
    visited[next] = True
