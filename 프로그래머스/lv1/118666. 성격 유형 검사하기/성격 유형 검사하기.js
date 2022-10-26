function solution(survey, choices) {
    let characters1 = ["RT", "CF", "JM", "AN"];
    let characters2 = ["TR", "FC", "MJ", "NA"];
    
    let scores = [0, 0, 0, 0];
    
    for (let i = 0; i < survey.length; i++) {
        if (choices[i] === 4) continue;
        switch(survey[i]) {
            case "RT": case "CF": case "JM": case "AN":
                if (choices[i] < 4) {
                    scores[characters1.indexOf(survey[i])] -= (4 - choices[i]);
                } else {
                    scores[characters1.indexOf(survey[i])] += (choices[i] - 4);
                }
                break;
            case "TR": case "FC": case "MJ": case "NA":
                if (choices[i] < 4) {
                    scores[characters2.indexOf(survey[i])] += (4 - choices[i]);
                } else {
                    scores[characters2.indexOf(survey[i])] -= (choices[i] - 4);
                }
                break;
        }
    }
    
    let mbti = ["R", "C", "J", "A"];
    let itbm = ["T", "F", "M", "N"];
    
    for (let i = 0; i < scores.length; i++) {
        if (scores[i] > 0) mbti[i] = itbm[i];
    }
    
    return mbti.join("");
}