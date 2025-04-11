import sys
from collections import deque

input = sys.stdin.readline

n = int(input())

indegrees = [0 for _ in range(n+1)]
graph = [[] for _ in range(n+1)]
times = [0 for _ in range(n+1)]
time_cum = [0 for _ in range(n+1)]

q = deque()

for i in range(n):
  line = list(map(int, input().split()))
  t = line[0]
  count = line[1]
  times[i+1] = t
  indegrees[i+1] = count
  if count == 0:
    q.append((i+1, t))
  else:
    for j in range(count):
      graph[line[2+j]].append(i+1)

answer = 0

prev_max = 0

while q:
  now, cum = q.popleft()
  time_cum[now] = max(time_cum[now], cum)

  for v in graph[now]:
    indegrees[v] -= 1
    time_cum[v] = max(time_cum[v], time_cum[now] + times[v])
    if indegrees[v] == 0:
      q.append((v, time_cum[v]))


print(max(time_cum))
