def time_to_sec(time_str):
    h, m, s = map(int, time_str.split(':'))
    return h * 3600 + m * 60 + s

def sec_to_time(sec):
    h = sec // 3600
    sec %= 3600
    m = sec // 60
    s = sec % 60
    return f"{h:02}:{m:02}:{s:02}"

def solution(play_time, adv_time, logs):
    play_sec = time_to_sec(play_time)
    adv_sec = time_to_sec(adv_time)
    
    total = [0] * (play_sec + 2)
    
    for log in logs:
        start, end = map(time_to_sec, log.split('-'))
        total[start] += 1
        total[end] -= 1

    for i in range(1, play_sec + 1):
        total[i] += total[i - 1]
    for i in range(1, play_sec + 1):
        total[i] += total[i - 1]

    max_view = total[adv_sec - 1]
    max_time = 0
    for i in range(adv_sec, play_sec + 1):
        current_view = total[i] - total[i - adv_sec]
        if current_view > max_view:
            max_view = current_view
            max_time = i - adv_sec + 1

    return sec_to_time(max_time)

