def solution(m, musicinfos):
    # '#'이 붙은 음을 처리하기 쉬운 다른 문자로 일괄 치환
    def replace_sharps(melody):
        return melody.replace('C#', 'c').replace('D#', 'd').replace('F#', 'f').replace('G#', 'g').replace('A#', 'a').replace('B#', 'b')

    m = replace_sharps(m)
    
    # 조건에 맞는 음악 후보들을 저장할 리스트
    matching_songs = []

    for idx, info in enumerate(musicinfos):
        start_time, end_time, title, melody_sheet = info.split(',')
        
        # 시간 -> 분으로 변환 및 재생 시간 계산
        start_h, start_m = map(int, start_time.split(':'))
        end_h, end_m = map(int, end_time.split(':'))
        duration = (end_h * 60 + end_m) - (start_h * 60 + start_m)
        
        melody_sheet = replace_sharps(melody_sheet)
        
        # 악보가 비어있는 경우, 재생 시간이 0보다 커도 full_melody가 비게 됨
        # divmod(x, 0) 오류 방지
        if not melody_sheet:
            continue

        # 재생 시간만큼의 전체 멜로디 생성
        q, r = divmod(duration, len(melody_sheet))
        full_melody = melody_sheet * q + melody_sheet[:r]
        
        # 멜로디가 포함되어 있다면 후보 리스트에 추가
        if m in full_melody:
            # (재생 시간, 입력 순서, 제목) 튜플 형태로 저장
            matching_songs.append((duration, idx, title))
            
    # 후보가 한 명도 없으면 "(None)" 반환
    if not matching_songs:
        return "(None)"
    
    # 후보 리스트를 우선순위 규칙에 따라 정렬
    # 1. 재생 시간(duration)은 내림차순 (-x[0])
    # 2. 입력 순서(idx)는 오름차순 (x[1])
    matching_songs.sort(key=lambda x: (-x[0], x[1]))
    
    # 정렬된 리스트의 가장 첫 번째 원소가 최종 정답
    return matching_songs[0][2]