# 2024.10.24~25

# 1~N번 정점 최단거리
# - 주어진 두 정점 반드시 통과
# - 한번 이동했던 정점, 간선 다시 이동 가능
# 정점 N, 간선 E (2 ≤ N ≤ 800, 0 ≤ E ≤ 200,000)
# 간선은 양방향

import sys
import heapq

input = sys.stdin.readline

N, E = map(int, input().split())
graph = [[] for _ in range(N + 1)]

# 초기화
for _ in range(E):
  a, b, c = map(int, input().split())
  # (가중치, 목적지 노드) 형태로 저장
  graph[a].append((b, c))
  graph[b].append((a, c))

V1, V2 = map(int, input().split())

INF = sys.maxsize


def dijkstra(start, end):
  dp = [INF] * (N + 1)
  q = []
  # 시작 노드로 가기 위한 최단 경로는 0으로 설정하며, 큐에 삽입
  heapq.heappush(q, (0, start))
  dp[start] = 0
  while q:  # 큐가 비어있지 않다면
    # 가장 최단 거리가 짧은 노드에 대한 정보 꺼내기
    dist, now = heapq.heappop(q)

    # 현재 노드가 이미 처리된 적이 있는 노드라면 무시
    if dp[now] < dist:
      continue

    # 현재 노드와 연결된 다른 인접한 노드들을 확인
    for i in graph[now]:
      cost = dist + i[1]
      # 현재 노드를 거쳐서, 다른 노드로 이동하는 거리가 더 짧은 경우
      if cost < dp[i[0]]:
        dp[i[0]] = cost
        heapq.heappush(q, (cost, i[0]))

  return dp[end]


path1 = dijkstra(1, V1) + dijkstra(V1, V2) + dijkstra(V2, N)
path2 = dijkstra(1, V2) + dijkstra(V2, V1) + dijkstra(V1, N)

if path1 >= INF and path2 >= INF:
  print(-1)
else:
  print(min(path1, path2))
