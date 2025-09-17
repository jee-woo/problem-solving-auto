#          판매원이름,추천판매원,판매량집계-이름,판매량집계-수량
def solution(enroll, referral, seller, amount):
    answer = []
    n = len(enroll)
    m = len(seller)
    
    # 재귀 구조
    
    enroll_map = dict()
    
    for i in range(n):
        e = enroll[i]
        r = referral[i]
        enroll_map[e] = [r, 0]
    
    for i in range(m):
        s = seller[i]
        a = amount[i] * 100
        
        r, sales = enroll_map[s]
        
        now = s
        while a and now != "-":
            parent = enroll_map[now][0]
            ten_percent = a // 10
            
            # 계산
            mine = a - ten_percent
            a = ten_percent
            
            enroll_map[now][1] += mine
            
            now = parent
    
    for name in enroll:
        answer.append(enroll_map[name][1])
    
    return answer


"""

단, 10% 를 계산할 때에는 원 단위에서 절사하며, 10%를 계산한 금액이 1 원 미만인 경우에는 이득을 분배하지 않고 자신이 모두 가집니다.

어느 누구의 추천도 없이 조직에 참여한 사람에 대해서는 referral 배열 내에 추천인의 이름이 기입되지 않고 “-“ 가 기입


각 판매원이 득한 이익금을 나열한 배열을 return

"""