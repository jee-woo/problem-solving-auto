import sys
import heapq

input = sys.stdin.readline

# 입력 받기
n, k = map(int, input().split())
jewels = []
bags = []

for _ in range(n):
    m, v = map(int, input().split())
    jewels.append((m, v))  # (무게, 가격)

for _ in range(k):
    bags.append(int(input()))  # 가방 무게

# 1️⃣ 보석을 무게 기준으로 정렬 (무게가 작은 순서대로 확인하기 위함)
jewels.sort()

# 2️⃣ 가방을 무게 기준으로 정렬
bags.sort()

# 3️⃣ 우선순위 큐 (힙) 사용
answer = 0
valid_jewels = []
jewel_index = 0

# 4️⃣ 가방을 작은 무게부터 하나씩 처리
for bag in bags:
    # 현재 가방에 넣을 수 있는 모든 보석을 `valid_jewels` 힙에 추가
    while jewel_index < n and jewels[jewel_index][0] <= bag:
        heapq.heappush(valid_jewels, -jewels[jewel_index][1])  # 가격을 최대 힙으로 저장
        jewel_index += 1

    # 현재 가방에 넣을 수 있는 보석 중 가장 비싼 보석을 선택
    if valid_jewels:
        answer += -heapq.heappop(valid_jewels)

print(answer)
