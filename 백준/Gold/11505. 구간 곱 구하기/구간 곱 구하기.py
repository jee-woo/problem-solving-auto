import sys
input = sys.stdin.readline
mod = 1000000007


def construct(size, n, nums):
  # 세그먼트 트리 배열: 전체 노드 개수 = size * 2
  tree = [1] * (size * 2)
  # 리프 노드 부분 (인덱스 size부터 size+n-1)
  for i in range(n):
    tree[size + i] = nums[i]
  # 내부 노드 초기화 (아래에서 위로)
  for i in range(size - 1, 0, -1):
    tree[i] = (tree[i * 2] * tree[i * 2 + 1]) % mod
  return tree


def update(idx, num, tree, size):
  # 업데이트할 노드: idx는 0-indexed (입력은 1-indexed이므로 호출 시 b-1 사용)
  idx = idx + size
  tree[idx] = num
  # 부모 노드부터 upate
  while idx > 1:
    idx //= 2
    tree[idx] = (tree[idx * 2] * tree[idx * 2 + 1]) % mod
  return tree


def segment(l, r, nl, nr, nn, tree):
  # [l, r] : 찾고자 하는 구간 (0-indexed, 리프 기준)
  # [nl, nr] : 현재 nn번 노드가 담당하는 구간
  # nn : 현재 노드의 인덱스 (1-indexed 기준 tree 배열)
  if nr < l or nl > r:
    # 구간이 겹치지 않으면 곱의 항등원 1 반환
    return 1
  if l <= nl and nr <= r:
    # 현재 구간이 완전히 포함되면 해당 노드 반환
    return tree[nn]
  mid = (nl + nr) // 2 
  return (segment(l, r, nl, mid, nn * 2, tree) * segment(l, r, mid + 1, nr, nn * 2 + 1, tree)) % mod


def main():
  n, m, k = map(int, input().split())
  nums = [int(input().strip()) for _ in range(n)]

  # size : n 이상의 최소 2의 거듭제곱
  size = 1
  while size < n:
    size *= 2

  tree = construct(size, n, nums)
  results = []
  total_ops = m + k
  for _ in range(total_ops):
    a, b, c = map(int, input().split())
    if a == 1:
      # 업데이트 연산: b번째 값을 c로 변경 (b는 1-indexed)
      tree = update(b - 1, c, tree, size)
    elif a == 2:
      # 구간 곱 쿼리: b번째부터 c번째까지 (1-indexed → 0-indexed 변환)
      res = segment(b - 1, c - 1, 0, size - 1, 1, tree)
      results.append(str(res))
  sys.stdout.write("\n".join(results))


if __name__ == '__main__':
  main()
