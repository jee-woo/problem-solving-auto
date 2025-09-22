def solution(n, s, a, b, fares):
    INF = int(1e9)
    answer = INF
    dists = [[INF] * (n+1) for _ in range(n+1)]
    
    for i in range(1, n+1):
        dists[i][i] = 0
    
    for c, d, f in fares:
        dists[c][d] = f
        dists[d][c] = f
        
    for k in range(1, n+1):
        for i in range(1, n+1):
            for j in range(1, n+1):
                dists[i][j] = min(dists[i][k] + dists[k][j], dists[i][j])
    
    for t in range(1, n+1):
        answer = min(dists[s][t] + dists[t][a] + dists[t][b], answer)
    
    return answer

"""
다익스트라? 플로이드 워셜.
우선순위큐

S부터 모든 점까지
- 혼자 갈 때 최단거리
- 합승 했을 때 최단거리 (요금/2)

3 <= n <= 200

(1/2)
합승 + A까지 + B까지
S~1 + 1~A + 1~B
S~2 + 2~A + 2~B
S~3 + 3~A + 3~B
S~4 
S~5
S~6


"""