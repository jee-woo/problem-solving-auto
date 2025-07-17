def solution(n, costs):
    answer = 0
    nodes = set()
    parent = dict()
    
    def union_parents(a, b):
        a = find_parent(a)
        b = find_parent(b)
        if a < b:
            parent[b] = a
        else:
            parent[a] = b
    
    def find_parent(node):
        if node != parent[node]:
            parent[node] = find_parent(parent[node])
        return parent[node]
    
    for n1, n2, cost in costs:
        nodes.add(n1)
        nodes.add(n2)
    for node in nodes:
        parent[node] = node
        
    costs.sort(key=lambda x: x[2])
    
    for a, b, cost in costs:
        if find_parent(a) != find_parent(b):
            union_parents(a, b)
            answer += cost
    
    return answer

"""

최소신장트리
유니온 파인드



"""