function solution(x) {
    let strAns = x.toString();
    
    let sum = 0;
    
    for (let i=0; i<strAns.length; i++) {
        sum = sum + Number(strAns.charAt(i));
    }
    
    return x % sum ? false : true;
}