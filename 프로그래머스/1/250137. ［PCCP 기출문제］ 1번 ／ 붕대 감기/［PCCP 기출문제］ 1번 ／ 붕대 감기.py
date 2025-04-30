def solution(bandage, health, attacks):
    t, x, y = bandage
    max_time = attacks[-1][0]
    
    hp = health
    ai = 0 # attacks index
    non_stop = 0
    banding = 0
    
    for i in range(1, max_time+1):
        if attacks[ai][0] == i: # 현재 시각에 공격을 받았다면
            banding = 0
            non_stop = 0
            hp -= attacks[ai][1]
            if hp <= 0: return -1 # hp 0 이하이면 바로 사망
            ai += 1
            # print(hp, banding, non_stop, ai, 'attacked')
            continue

        if hp < health:
            if hp + x > health:
                hp = health
            else:
                hp += x # 1초마다 x만큼 회복
        non_stop += 1
        if non_stop == t:
            if hp < health:
                if hp + y > health:
                    hp = health
                else:
                    hp += y # t초 연속 성공 시 y만큼 회복
            non_stop = 0
        # else: non_stop += 1
        banding += 1
        # print(hp, banding, non_stop, ai, 'healed')

    return hp