def solution(name):
    # 1. 알파벳 변경에 필요한 조작 횟수 (상하) 먼저 계산
    up_down_cost = 0
    for char in name:
        up_down_cost += min(ord(char) - ord('A'), ord('Z') - ord(char) + 1)

    # 2. 좌우 이동의 최솟값 계산
    n = len(name)
    min_move = n - 1  # 기본값: 한쪽 방향으로만 쭉 이동하는 경우

    for i in range(n):
        # i 다음부터 연속된 A가 어디까지인지 찾기
        next_i = i + 1
        while next_i < n and name[next_i] == 'A':
            next_i += 1
        
        # [i] 지점까지 갔다가 돌아와서, 나머지 부분을 처리하는 이동 횟수 계산
        # 기존 최솟값, 오른쪽으로 갔다가 돌아오는 경우, 왼쪽으로 갔다가 돌아오는 경우를 모두 비교
        
        # 오른쪽으로 i까지 갔다가 되돌아와서 왼쪽으로 가는 경로
        go_right_then_left = i * 2 + (n - next_i)
        
        # 왼쪽으로 먼저 갔다가 되돌아와서 오른쪽으로 i까지 가는 경로
        go_left_then_right = (n - next_i) * 2 + i
        
        # 가장 작은 이동 값으로 갱신
        min_move = min(min_move, go_right_then_left, go_left_then_right)

    # 3. 두 비용을 합산하여 최종 결과 반환
    return up_down_cost + min_move


"""
위로 이동할지 아래로 이동할지 -> O

왼쪽으로 이동할지 오른쪽으로 이동할지 -> ??



모든 글자는 A에서 시작



JAA
---

JAAAAA
JEROEN
------



"""