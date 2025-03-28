import sys
import bisect
input = sys.stdin.readline


def main():
  n = int(input())
  a = list(map(int, input().split()))
  parent = dict()

  # lis는 길이가 i인 증가하는 부분수열의 '끝 원소' 후보 중 가장 작은 값을 저장
  lis = []
  i_lis = []
  for i in range(len(a)):
    x = a[i]
    # lis에서 x를 삽입할 적절한 위치를 이분탐색으로 찾음
    pos = bisect.bisect_left(lis, x)

    if pos == len(lis):
      parent[i] = pos
      lis.append(x)
      i_lis.append(i)
    else:
      parent[i] = pos
      lis[pos] = x
      i_lis[pos] = i

    if pos > 0:
      parent[i] = i_lis[pos-1]

  last_idx = i_lis[-1]

  # print(lis)
  print(len(lis))
  # print(parent)
  count = 1

  stack = []

  # print('last_idx', last_idx)

  while count <= len(lis):
    # print(last, a[last_idx])
    stack.append(str(a[last_idx]))
    last_idx = parent[last_idx]
    count += 1
  stack.reverse()
  print(' '.join(stack))


if __name__ == '__main__':
  main()
