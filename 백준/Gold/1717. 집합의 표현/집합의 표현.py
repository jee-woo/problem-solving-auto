import sys
sys.setrecursionlimit(100001)

input = sys.stdin.readline

n, m = map(int, input().split())

parent = list(range(n+1))

# print(parent)


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


for i in range(m):
  q, a, b = map(int, input().split())

  if q == 0:
    union_parent(a, b)
  elif q == 1:
    if find_parent(a) == find_parent(b):
      print('YES')
    else:
      print('NO')
