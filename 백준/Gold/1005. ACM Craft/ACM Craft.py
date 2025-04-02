import sys
import heapq
from collections import deque

input = sys.stdin.readline

# 동시 진행 가능
# 동시 진행되는 것 중 최대 시간으로 걸림

t = int(input())


def solution():
  n, k = map(int, input().split())
  answer = 0
  times = [0] + list(map(int, input().split()))
  graph = [[] for _ in range(n+1)]
  indegrees = [0 for _ in range(n+1)]

  time_cum = [0 for _ in range(n+1)]

  for _ in range(k):
    x, y = map(int, input().split())
    graph[x].append(y)
    indegrees[y] += 1

  w = int(input())

  q = []

  for i in range(1, n+1):
    if indegrees[i] == 0:
      heapq.heappush(q, (0, times[i], i))

  while q:
    level, cum, now = heapq.heappop(q)
    # print(cum, now)

    time_cum[now] = max(time_cum[now], cum)

    if w == now:
      break

    for i in graph[now]:
      indegrees[i] -= 1
      time_cum[i] = max(time_cum[now] + times[i], time_cum[i])

      if indegrees[i] == 0:
        # heapq.heappush(q, (level+1, -times[i], i))
        # time_cum[i] += (time_cum[now] + times[i])
        # print('i, time_cum[i]', i, time_cum[i])
        heapq.heappush(q, (level+1, time_cum[i], i))

  # print(time_cum)
  print(time_cum[w])


for _ in range(t):
  solution()

