import sys

# 문제의 제약 조건에 따라 재귀 깊이 제한을 늘려줍니다.
# 트리가 한쪽으로 치우쳐 길어질 경우 RecursionError가 발생할 수 있습니다.
sys.setrecursionlimit(10**6)

# 트리의 각 노드를 표현하는 클래스
class Node:
    def __init__(self, num, x, y):
        self.num = num
        self.x = x
        self.y = y
        self.left = None
        self.right = None

# 트리에 노드를 삽입하는 재귀 함수
def insert_node(parent, child):
    # 부모보다 x가 작으면 왼쪽 서브트리로
    if child.x < parent.x:
        if parent.left is None:
            parent.left = child
        else:
            insert_node(parent.left, child)
    # 부모보다 x가 크면 오른쪽 서브트리로
    else:
        if parent.right is None:
            parent.right = child
        else:
            insert_node(parent.right, child)

# 전위 순회 (Root -> Left -> Right)
def preorder(node, result_list):
    if node:
        result_list.append(node.num)
        preorder(node.left, result_list)
        preorder(node.right, result_list)

# 후위 순회 (Left -> Right -> Root)
def postorder(node, result_list):
    if node:
        postorder(node.left, result_list)
        postorder(node.right, result_list)
        result_list.append(node.num)

def solution(nodeinfo):
    # answer를 전위, 후위 순회 결과를 담을 두 개의 리스트로 초기화
    answer = [[], []]
    n = len(nodeinfo)
    
    # nodeinfo에 각 노드의 번호를 추가: [x, y, node_번호]
    for i in range(n):
        nodeinfo[i].append(i + 1)
    
    # 정렬: 1) y좌표 기준 내림차순, 2) y좌표 같으면 x좌표 기준 오름차순
    # 이렇게 정렬하면 항상 리스트의 첫 번째 노드가 루트 노드가 됨
    nodeinfo.sort(key=lambda x: (-x[1], x[0]))
    
    # --- 트리 구성 ---
    # 정렬된 리스트의 첫 번째 노드로 루트 노드를 생성
    root = Node(num=nodeinfo[0][2], x=nodeinfo[0][0], y=nodeinfo[0][1])
    
    # 나머지 노드들을 트리에 순서대로 삽입
    for i in range(1, n):
        child_node = Node(num=nodeinfo[i][2], x=nodeinfo[i][0], y=nodeinfo[i][1])
        insert_node(root, child_node)
    
    # --- 전위 순회 ---
    preorder(root, answer[0])
    
    # --- 후위 순회 ---
    postorder(root, answer[1])
    
    return answer