import sys

n = int(input())

stars = [None for _ in range(n)]

for i in range(n):
  x, y = map(float, input().split())
  stars[i] = (x, y)


def get_distance(x1, y1, x2, y2):
  return ((x1-x2)**2 + (y1-y2)**2) ** 0.5


edges = []

for i in range(n):
  for j in range(i+1, n):
    dist = get_distance(stars[i][0], stars[i][1], stars[j][0], stars[j][1])
    # print(stars[i], stars[j], dist)
    edges.append((dist, i, j))

edges.sort()

# print(edges)
parent = list(range(n))


def find_parent(v):
  if v != parent[v]:
    parent[v] = find_parent(parent[v])
  return parent[v]


def union_parent(a, b):
  a = find_parent(a)
  b = find_parent(b)
  if a < b:
    parent[b] = a
  else:
    parent[a] = b


answer = 0

for dist, s1, s2 in edges:
  if find_parent(s1) != find_parent(s2):
    union_parent(s1, s2)
    # print(parent)
    answer += dist

print(round(answer, 2))
