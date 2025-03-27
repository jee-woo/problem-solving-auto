import sys
import bisect
input = sys.stdin.readline


def main():
  n = int(input())
  a = list(map(int, input().split()))

  # lis는 길이가 i인 증가하는 부분수열의 '끝 원소' 후보 중 가장 작은 값을 저장
  lis = []
  for x in a:
    # lis에서 x를 삽입할 적절한 위치를 이분탐색으로 찾음
    pos = bisect.bisect_left(lis, x)
    if pos == len(lis):
      lis.append(x)
    else:
      lis[pos] = x
  print(len(lis))


if __name__ == '__main__':
  main()
