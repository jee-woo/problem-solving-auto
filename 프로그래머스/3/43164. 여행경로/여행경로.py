def solution(tickets):
    from collections import defaultdict
    
    graph = defaultdict(list)
    for frm, to in tickets:
        graph[frm].append(to)
        graph.setdefault(to, [])
    
    for k in graph:
        graph[k].sort()

    used = defaultdict(int)
    edges = defaultdict(int)
    for frm, to in tickets:
        edges[(frm, to)] += 1

    N = len(tickets)
    route = ["ICN"]
    answer = []

    def dfs():
        if len(route) == N + 1:
            answer.extend(route)
            return True
        cur = route[-1]
        for nxt in graph.get(cur, []):
            if used[(cur, nxt)] < edges[(cur, nxt)]:
                used[(cur, nxt)] += 1
                route.append(nxt)
                if dfs(): return True
                route.pop()
                used[(cur, nxt)] -= 1
        return False

    dfs()
    return answer
