function d(n) {
  let temp = n;
  let str = n + "";
  for (let i = 0; i < str.length; i++) {
    temp += +str[i];
  }
  return temp;
}

let dn = new Array(10000).fill(0);

for (let i = 1; i <= 10000; i++) {
  if (d(i) <= 10000) dn[d(i)] = 1;
}
let answer = ""
for (let i = 1; i <= 10000; i++) {
  //if (!dn[i]) console.log(i);
  if (!dn[i]) answer += i + "\n";
}
console.log(answer);