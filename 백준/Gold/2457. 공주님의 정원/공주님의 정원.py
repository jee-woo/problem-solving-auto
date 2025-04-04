import sys
import heapq

input = sys.stdin.readline

n = int(input())  # 1<=n<=100,000

flowers = []
q = []


for i in range(n):
  a, b, c, d = map(int, input().split())
  # a가 2 이하이면 a = 3, b = 1로 가정
  # c가 12이면 c = 11, d = 30으로 가정
  if c <= 2 or a == 12:
    continue
  if a <= 2:
    a = 3
    b = 1
  if c == 12:
    c = 12
    d = 1
  flowers.append((a * 100 + b, c * 100 + d))

flowers.sort(key=lambda x: (x[0], -x[1]))
# print(flowers)

answer = 0
selected = [flowers[0]]

# [(3, 1, 6, 30),]
# (3, 1, 5, 31)

# 예비: (5,15,8,31)

예비 = None

for s, e in flowers:
  if s == selected[-1][0]:
    continue
  if s > selected[-1][1] and 예비:
    selected.append(예비)
    예비 = None
  if s <= selected[-1][1]:
    if (예비 and e >= 예비[1]) or 예비 == None:
      예비 = (s, e)
  # print(s, e)
  # print(예비)

if 예비 and selected[-1][1] <= 1130:
  selected.append(예비)

# print(selected)

if selected[-1][1] <= 1130 or selected[0][0] > 301:
  selected = []

print(len(selected))