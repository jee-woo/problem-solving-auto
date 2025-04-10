import sys
from collections import deque

input = sys.stdin.readline

n, k = map(int, input().split())
uses = list(map(int, input().split()))

answer = 0

devices = dict()
for i in range(k):
  if uses[i] not in devices:
    devices[uses[i]] = deque()
  devices[uses[i]].append(i)

tab = set()

for i in range(k):
  now = uses[i]
  devices[now].popleft()  # 지금 사용하니까 큐에서 제거

  if now in tab:
    continue  # 이미 꽂혀 있으면 pass

  if len(tab) < n:
    tab.add(now)
    continue  # 빈 자리 있으면 꽂고 끝

  # 꽂을 자리가 없음 -> 뭘 빼야 하나?
  latest_use = -1
  target = None
  for t in tab:
    # 이후에 안 쓰이면 그거 빼기
    if not devices[t]:
      target = t
      break
    elif devices[t][0] > latest_use:
      latest_use = devices[t][0]
      target = t

  tab.remove(target)
  tab.add(now)
  answer += 1

print(answer)
