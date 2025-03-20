import sys
from collections import deque
input = sys.stdin.readline

# n: 가수의 수
# m: 보조 PD의 수
n, m = map(int, input().split())

indegree = [0 for _ in range(n+1)]
graph = [[] for _ in range(n+1)]

for i in range(m):
  nums = list(map(int, input().split()))
  count = nums[0]
  seq = nums[1:]

  for j in range(len(seq)-1):
    graph[seq[j]].append(seq[j+1])
    indegree[seq[j+1]] += 1

q = deque()

for i in range(1, n+1):
  if indegree[i] == 0:
    q.append(i)

result = []

while q:
  now = q.popleft()
  result.append(str(now))

  for num in graph[now]:
    indegree[num] -= 1
    if indegree[num] == 0:
      q.append(num)

if len(result) == n:
  print('\n'.join(result))
else:
  print(0)
