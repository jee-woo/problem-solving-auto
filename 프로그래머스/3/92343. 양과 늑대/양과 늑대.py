class Node:
    def __init__(self, value, parent):
        self.value = value
        self.children = []
        self.parent = parent
        self.sheeps = 0

def solution(info, edges):
    answer = 0
    n = len(info)

    nodes = [None] * n
    root = Node(info[0], None)
    nodes[0] = root
    for parent, child in edges:
        if not nodes[child]:
            nodes[child] = Node(info[child], parent)
        if nodes[child].parent is None:
            nodes[child].parent = parent
        if not nodes[parent]:
            nodes[parent] = Node(info[parent], None)
        nodes[parent].children.append(child)
    # S = 0
    # for i in info:
    #     if i == 0: S += 1
    

#     def dfs(now, sc, wc, nexts):
#         nonlocal answer
#         answer = max(answer, sc)
        
#         if sc > 0 and sc == wc:
#             return
#         # if answer == S: return
        
#         node = nodes[now]
#         is_sheep = node.value == 0
#         next_set = set(nexts + node.children)
#         if now in next_set: next_set.remove(now)
#         now_nexts = list(next_set)
        
#         for next_node in now_nexts:
#             dfs(next_node,
#                 (sc + 1) if is_sheep else sc,
#                 wc if is_sheep else (wc + 1), now_nexts)
        
#         return
        
#     dfs(0, 0, 0, [])

    def dfs(sheep_count, wolf_count, possible_nodes):
        nonlocal answer
        answer = max(answer, sheep_count)

        # 현재 방문 가능한 모든 노드에 대해 시도
        for next_node_idx in possible_nodes:
            # 이 경로에서만 사용할 새로운 nexts 목록 생성
            new_possible = set(possible_nodes)
            new_possible.remove(next_node_idx)
            # 새로 방문한 노드의 자식들을 다음 후보에 추가
            for child in nodes[next_node_idx].children:
                new_possible.add(child)

            # 양/늑대 수 새로 계산
            new_sheep = sheep_count
            new_wolf = wolf_count
            if info[next_node_idx] == 0:
                new_sheep += 1
            else:
                new_wolf += 1

            # 가지치기
            if new_sheep <= new_wolf:
                continue

            # 새로운 상태로 재귀 호출
            dfs(new_sheep, new_wolf, list(new_possible))

    # 최초 호출
    dfs(1, 0, nodes[0].children)
    
    
    return answer

"""
양 > 늑대 유지
양 == 늑대 되는 순간의 양 마리수

2 <= v <= 17
e = v - 1

총 양 마리수 = S

자손에 남아있는 양 개수 저장?
루트로 돌아왔을 때 양이 남아있다면 다시 갔던 길 탐색


"""


        
#     children_sheeps = [0] * n
    
#     def dfs(v):
#         node = nodes[v]
#         if not node.children:
#             children_sheeps[v] = 1 if node.value == 0 else 0
#             return children_sheeps[v]
#         cs = 0
#         for child in node.children:
#             cs += dfs(child)

#         # (수정된 부분) 현재 노드가 양인지 확인하고 추가합니다.
#         current_node_sheep = 1 if node.value == 0 else 0
#         total_sheeps = cs + current_node_sheep

#         children_sheeps[v] = total_sheeps
#         return total_sheeps
    