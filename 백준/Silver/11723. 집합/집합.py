import sys
input = sys.stdin.readline

M = int(input())
S = 0  # 비트마스크로 집합 표현

for _ in range(M):
  line = input().strip().split()
  command = line[0]

  if len(line) == 2:
    x = int(line[1])

  if command == "add":
    S |= (1 << (x - 1))
  elif command == "remove":
    S &= ~(1 << (x - 1))
  elif command == "check":
    print(1 if (S & (1 << (x - 1))) else 0)
  elif command == "toggle":
    S ^= (1 << (x - 1))
  elif command == "all":
    S = (1 << 20) - 1
  elif command == "empty":
    S = 0
