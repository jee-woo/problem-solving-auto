def solution(players, m, k):
    answer = 0
    now_server = 0
    
    servers = [0] * 24
    
    for now, player in enumerate(players):
        if player <= m * servers[now]: continue
        to_add = player // m - servers[now]
        answer += to_add
        
        for i in range(now, min(now+k, 24)):
            servers[i] += to_add
        
    return answer

"""
모든 게임 이용자를 감당하기 위한 최소 서버 증설 횟수를 return

같은 시간대에 게임을 이용하는 사람이 m명 늘어날 때마다 서버 1대가 추가로 필요합니다.
어느 시간대의 이용자가 n x m명 이상 (n + 1) x m명 미만이라면 최소 n대의 증설된 서버가 운영 중이어야 합니다. 

한 번 증설한 서버는 k시간 동안 운영하고 그 이후에는 반납합니다.

하루 동안 모든 게임 이용자가 게임을 하기 위해 서버를 최소 몇 번 증설해야 하는지 알고 싶습니다.


"""