import sys
sys.setrecursionlimit(200000)

input = sys.stdin.readline

n, r, q = map(int, input().split())

connect = [[] for _ in range(n+1)]

for i in range(n-1):
  u, v = map(int, input().split())
  connect[u].append(v)
  connect[v].append(u)


def solution():
  size = [0 for _ in range(n+1)]
  children = [[] for _ in range(n+1)]

  def makeTree(currentNode, parent):
    for Node in connect[currentNode]:
      if Node != parent:
        children[currentNode].append(Node)
        # parents[Node] = currentNode
        makeTree(Node, currentNode)

  def countSubtreeNodes(currentNode):
    size[currentNode] = 1
    for Node in children[currentNode]:
      countSubtreeNodes(Node)
      size[currentNode] += size[Node]

  makeTree(r, -1)
  countSubtreeNodes(r)

  for _ in range(q):
    # parents = [None for _ in range(n+1)]
    u = int(input())

    print(size[u])
    # print('children', children)
    # print('parents', parents)
    # print('size', size)


solution()