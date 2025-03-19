import sys
import heapq
# from collections import deque

input = sys.stdin.readline

n, m = map(int, input().split())

graph = [[] for _ in range(n + 1)]
indegree = [0] * (n + 1)

for i in range(m):
  a, b = map(int, input().split())
  graph[a].append(b)
  indegree[b] += 1

# q = deque()
q = []

for i in range(1, n + 1):
  if indegree[i] == 0:
    heapq.heappush(q, i)
    # q.append(i)

# print(graph)
solution = []
# print(q)

while q:
  # now = q.popleft()
  now = heapq.heappop(q)
  solution.append(str(now))

  for i in graph[now]:
    indegree[i] -= 1
    if indegree[i] == 0:
      # q.append(i)
      heapq.heappush(q, i)

  # sorted(q)
  # print(q)

print(' '.join(solution))
