import sys

input = sys.stdin.readline

n, m = map(int, input().split())


def find_parent(v, parent):
  if v != parent[v]:
    parent[v] = find_parent(parent[v], parent)
  return parent[v]


def union_parent(a, b, parent):
  a = find_parent(a, parent)
  b = find_parent(b, parent)
  if a < b:
    parent[b] = a
  else:
    parent[a] = b


parent = [0 for _ in range(n)]

for i in range(n):
  parent[i] = i

found = False

for i in range(m):
  a, b = map(int, input().split())
  parent_a = find_parent(a, parent)
  parent_b = find_parent(b, parent)
  if parent_a == parent_b:
    print(i + 1)
    found = True
    break
  union_parent(a, b, parent)

if not found:
  print(0)
