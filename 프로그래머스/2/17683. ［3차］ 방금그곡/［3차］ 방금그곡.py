def str_to_min(str_time):
    h, m = map(int, str_time.split(':'))
    
    return h * 60 + m

def str_to_melody(melody):
    melody_arr = []
    for i in range(len(melody)):
        if melody[i] != "#":
            melody_arr.append(melody[i])
            continue
        melody_arr[-1] = melody_arr[-1] + "#"
    return melody_arr

def solution(m, musicinfos):
    answer = "(None)"
    musics = []
    i=0
    for music in musicinfos:
        start, end, title, melody = music.split(",")
        end = str_to_min(end)
        start = str_to_min(start)
        
        duration = end - start
        
        melody_arr = str_to_melody(melody)
        
        if duration // len(melody_arr) > 0:
            melody = (' '.join(melody_arr) + ' ') * (duration // len(melody_arr)) + ' '.join(melody_arr[:duration % len(melody_arr)]) + " "
            
        else:
            melody = ' '.join(melody_arr[:duration]) + " "
        # print(melody)
        
        musics.append((title, melody, duration, i))
        i+=1
        
        # print(melody)
        # print(start, end, title, melody, duration)
    
    
    musics.sort(key=lambda x: (-x[2], x[3]))
    
    # print(musics)
    m = str_to_melody(m)
    m = ' '.join(m)
    # print(m)
    
    for title, melody, _, __ in musics:
        if m + ' ' in melody:
            return title
    
    return answer

"""
재생 시간만큼의 반복됐을 때의 멜로디 구하기
1 <= n <= 100



조건이 일치하는 음악이 여러 개일 때에는 라디오에서 재생된 시간이 제일 긴 음악 제목을 반환한다. 재생된 시간도 같을 경우 먼저 입력된 음악 제목을 반환한다.


"""