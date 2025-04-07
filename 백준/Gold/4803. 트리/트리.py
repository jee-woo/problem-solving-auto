import sys

input = sys.stdin.readline


def solution(t, n, m):
  graph = [[] for _ in range(n+1)]
  count = 0
  for i in range(m):
    a, b = map(int, input().split())
    graph[a].append(b)
    graph[b].append(a)
  # print(graph)
  visited = [False for _ in range(n+1)]

  def dfs(v, parent):
    if visited[v]:
      return False
    visited[v] = True
    for i in graph[v]:
      if i == parent:
        continue
      is_tree = dfs(i, v)
      if not is_tree:
        return False
    return True

  for i in range(1, n+1):
    if visited[i]:
      continue
    is_tree = dfs(i, 0)
    if is_tree:
      count += 1

  if count == 0:
    print(f"Case {t}: No trees.")
  elif count == 1:
    print(f"Case {t}: There is one tree.")
  else:
    print(f"Case {t}: A forest of {count} trees.")


t = 1
while True:
  n, m = map(int, input().split())
  if n == 0 and m == 0:
    break
  solution(t, n, m)
  t += 1
