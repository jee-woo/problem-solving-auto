def solution(users, emoticons):
    answer = [0, 0]
    discounts = []
    DIS = [10, 20, 30, 40]
    n = len(users)
    m = len(emoticons)
    
    # 중복순열
    def perm(dis_arr):
        if len(dis_arr) == m:
            discounts.append(dis_arr[:])
            return
        
        for i in range(4):
            dis_arr.append(DIS[i])
            perm(dis_arr)
            dis_arr.pop()
    
    perm([])
    # print(discounts)
    
    # 중복순열들 순회
    for k in range(len(discounts)):
        users_buy = [0 for _ in range(n)]
        # 비율, 이모티콘 순회
        for j in range(m):
            d = discounts[k][j]
            # users 순회
            for i in range(n):
                # 이모티콘 순회
                # for j in range(m):
                if users[i][0] <= d:
                    users_buy[i] += (emoticons[j] * ((100 - d) / 100))
                        
                        
        # users_buy 돌면서 이모티콘 플러스 가입자, 이모티콘 매출 계산
        # 최대값 answer에 갱신
        # print('discounts:',discounts[k])
        # print('users_buy:', users_buy)
        
        join = 0
        buy = 0
        for i in range(n):
            if users_buy[i] >= users[i][1]:
                users_buy[i] = 0
                join += 1
            buy += users_buy[i]
        
        # print('after:', users_buy, join)
        if join > answer[0]:
            answer = [join, buy]
        elif join == answer[0] and buy > answer[1]:
            answer = [join, buy]
    
    return answer

"""
행사 목적을 최대한으로 달성했을 때의 [이모티콘 플러스 서비스 가입 수, 이모티콘 매출액]을
1차원 정수 배열에 담아 return

1. 이모티콘 플러스 서비스 가입자를 최대한 늘리는 것.
2. 이모티콘 판매액을 최대한 늘리는 것.
1번 목표가 우선이며, 2번 목표가 그 다음입니다.

할인율은 10%, 20%, 30%, 40% 중 하나

- 할인 비율 -> 이모티콘 구매
- 이모티콘 구매 비용 합 -> 이모티콘 구매 취소, 이모티콘 플러스 가입

1 <= n <= 100
1 <= m <= 7

완탐? dfs 백트래킹

1. 할인율을 이모티콘마다 10, 20, 30, 40으로 설정
2. 사용자마다 현재 할인율로 이모티콘을 구매하는지 확인
    구매하면 구매비용에 추가
    만약 구매비용이 users[i][가격]이 넘어가면 구매비용 초기화하고 이모티콘 구매로 넘어감
3. 할인율 모두 적용했을 때 answer의 [이모티콘 플러스 서비스 가입 수, 이모티콘 매출액]과 비교
    이모티콘 플러스 서비스 가입 수 높으면 무조건 갱신
    가입 수 같으면 매출액 높으면 갱신
"""