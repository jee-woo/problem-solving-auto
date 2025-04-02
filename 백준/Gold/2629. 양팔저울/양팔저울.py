import sys
input = sys.stdin.readline

n = int(input())
chus = list(map(int, input().split()))

m = int(input())
marbles = list(map(int, input().split()))


dp = set()  # 특정 무게를 만들 수 있는 경우를 저장 (메모리 절약)
dp.add(0)

for weight in chus:
  new_dp = set(dp)  # 기존 가능한 무게를 복사
  for w in dp:
    new_dp.add(w + weight)  # 추를 같은 쪽에 놓는 경우
    new_dp.add(abs(w - weight))  # 추를 반대쪽에 놓는 경우
  dp = new_dp  # 업데이트

answer = ['Y' if marble in dp else 'N' for marble in marbles]
print(' '.join(answer))
