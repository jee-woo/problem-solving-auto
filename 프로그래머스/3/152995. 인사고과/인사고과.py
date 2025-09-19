def solution(scores):
    answer = 0
    # [근무 태도 점수, 동료 평가 점수]
    # scores[0] == 완호의 점수
    n = len(scores)
    if n == 1: return 1
    non_insentive = [False] * n
    
    scores_indexed = scores.copy()
    for i in range(n):
        scores_indexed[i].append(i)
    
    scores_indexed.sort(key=lambda x: (-x[0], x[1]))
    
    max_peer_score = -1
    for attitude, peer, i in scores_indexed:
        if peer > max_peer_score:
            max_peer_score = peer
        elif peer < max_peer_score:
            non_insentive[i] = True

    if non_insentive[0]:
        return -1
    
    rank = 1
    wanho_score = scores[0]
    wanho_sum = sum(wanho_score)
    for i in range(1, n):
        if non_insentive[i]:
            continue
        score_sum = scores[i][0] + scores[i][1]
        if score_sum > wanho_sum:
            rank += 1
  
    return rank


"""
인센티브 못받는 경우 찾아내기.

[[1, 4, 1], [2, 2, 0], [2, 1, 4], [3, 2, 2], [3, 2, 3]]


[완호의 석차를 return]
완호가 인센티브를 받지 못하는 경우 -1을 return

각 사원마다 근무 태도 점수와 동료 평가 점수가 기록되어 있는데

만약 어떤 사원이 다른 임의의 사원보다 두 점수가 모두 낮은 경우가 한 번이라도 있다면
    그 사원은 인센티브를 받지 못합니다.

그렇지 않은 사원들에 대해서는 두 점수의 합이 높은 순으로 석차를 내어 석차에 따라 인센티브가 차등 지급됩니다.





"""