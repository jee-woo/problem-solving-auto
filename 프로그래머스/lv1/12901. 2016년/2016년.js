function solution(a, b) {
    let months = [0, 31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]; // 0 ~ 12
    let day = b;
    
    for (let i = 1; i < a; i++) {
        day += months[i];
    }
    
    let days = ["THU", "FRI", "SAT", "SUN", "MON", "TUE", "WED"];
    // console.log(day, day % 7)
    return days[day % 7];
}