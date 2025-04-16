import sys
input = sys.stdin.read
data = input().split()

n, m = int(data[0]), int(data[1])
words = data[2:]

MAX_NODE = 5000000  # 최대 노드 수 (충분히 크게 잡기)
children = [[0] * 26 for _ in range(MAX_NODE)]
is_end = [False] * MAX_NODE
node_count = 1  # root는 0번 노드

# 사전 단어 insert
for word in words[:n]:
    node = 0
    for char in word:
        idx = ord(char) - ord('a')
        if children[node][idx] == 0:
            children[node][idx] = node_count
            node_count += 1
        node = children[node][idx]
    is_end[node] = True

# 검사
count = 0
for word in words[n:]:
    node = 0
    for i, char in enumerate(word):
        idx = ord(char) - ord('a')
        if children[node][idx] == 0:
            break
        node = children[node][idx]
        if i == len(word) - 1 and is_end[node]:
            count += 1
            break

print(count)
