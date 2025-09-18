def solution(a):
    # a의 길이가 2 이하이면 모든 풍선이 살아남으므로 n을 바로 반환합니다.
    n = len(a)
    if n <= 2:
        return n

    # 1. left_min 배열 생성: 각 인덱스까지 왼쪽에서의 최솟값을 저장합니다.
    # 예: a = [9, -1, -5] -> left_min = [9, -1, -5]
    left_min = [0] * n
    left_min[0] = a[0]
    for i in range(1, n):
        left_min[i] = min(left_min[i-1], a[i])

    # 2. right_min 배열 생성: 각 인덱스까지 오른쪽에서의 최솟값을 저장합니다.
    # 예: a = [9, -1, -5] -> right_min = [-5, -5, -5]
    right_min = [0] * n
    right_min[n-1] = a[n-1]
    for i in range(n-2, -1, -1):
        right_min[i] = min(right_min[i+1], a[i])

    # 3. 최종 개수 확인
    # 양쪽 끝 풍선은 무조건 가능하므로 answer를 2로 초기화합니다.
    answer = 2
    
    # 중간에 있는 풍선(인덱스 1부터 n-2까지)들을 확인합니다.
    for i in range(1, n - 1):
        # 현재 풍선(a[i])이 자신의 왼쪽 구간 최솟값(left_min[i-1])보다 작거나,
        # 또는 자신의 오른쪽 구간 최솟값(right_min[i+1])보다 작으면 살아남을 수 있습니다.
        if a[i] < left_min[i-1] or a[i] < right_min[i+1]:
            answer += 1
            
    return answer