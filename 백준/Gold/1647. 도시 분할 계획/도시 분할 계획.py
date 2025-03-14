import sys
sys.setrecursionlimit(100000)
input = sys.stdin.readline


def find_parent(parent, v):
  if parent[v] != v:
    parent[v] = find_parent(parent, parent[v])
  return parent[v]


def union_parent(parent, a, b):
  a = find_parent(parent, a)
  b = find_parent(parent, b)
  if a < b:
    parent[b] = a
  else:
    parent[a] = b


v, e = map(int, input().split())
parent = [0] * (v + 1)

for i in range(1, v+1):
  parent[i] = i

edges = []

for i in range(e):
  a, b, c = map(int, input().split())
  edges.append((c, a, b))

edges.sort()

# print(edges)

answer = 0
max_c = 0
for i in range(e):
  c, a, b = edges[i]

  if find_parent(parent, a) != find_parent(parent, b):
    union_parent(parent, a, b)
    max_c = max(c, max_c)
    answer += c

answer -= max_c

print(answer)
