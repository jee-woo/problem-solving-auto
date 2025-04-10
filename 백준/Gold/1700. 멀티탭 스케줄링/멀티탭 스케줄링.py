import sys
from collections import deque

input = sys.stdin.readline

n, k = map(int, input().split())

uses = list(map(int, input().split()))

answer = 0


devices = dict()

for i in range(k):
  if uses[i] in devices:
    devices[uses[i]].append(i)
  else:
    devices[uses[i]] = deque([i])


tab = set()

for i in range(k):
  now = uses[i]
  devices[now].popleft()
  if now in tab:
    continue
  if len(tab) < n:
    tab.add(now)
    continue
  max_i = -1
  max_d = None
  for t in tab:
    if len(devices[t]) == 0:
      max_d = t
      break
    elif devices[t][0] > max_i:
      max_d = t
      max_i = devices[t][0]

  tab.remove(max_d)
  tab.add(now)
  answer += 1

print(answer)