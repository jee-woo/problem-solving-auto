import sys
import heapq

input = sys.stdin.readline

n = int(input())
cards = [0 for _ in range(n)]

for i in range(n):
  cards[i] = int(input())

answer = 0

heapq.heapify(cards)

if n == 1:
  print(0)

else:
  while cards:
    card1 = heapq.heappop(cards)
    if cards:
      card2 = heapq.heappop(cards)
      answer += card1 + card2
    else:
      answer += card1
    # print(answer, card1, card2)
    if len(cards) == 0:
      break
    heapq.heappush(cards, card1 + card2)

  print(answer)
