const readline = require('readline');

let rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const board = [];
const bombBoard = [];
const bomb = [];
let N, K;
let lineCount = 0;

rl.on('line', (line) => {
  if (lineCount === 0) {
    // 첫 번째 줄 입력 처리 (N과 K)
    [N, K] = line.split(' ').map(Number);
  } else if (lineCount <= N) {
    // 그 다음 줄 입력 처리 (board 배열)
    board.push(line.split(' '));
		bombBoard.push(line.split(' ').map(v => v === '0' || v === '@' ? 0 : '#'));
  } else {
		bomb.push(line.split(' ').map(Number));
    if (lineCount === N + K) {
      rl.close(); // N개의 줄을 모두 받으면 입력 종료
    }
	}
	lineCount++;
});

rl.on('close', () => {
	// console.log(bombBoard)
	// console.log(board)

	bombing();
});

function bombing () {
	let max = 0;
	const dxdy = [[0, -1], [0, 1], [1, 0], [-1, 0]];
	for (let i = 0; i < bomb.length; i++) {
		const [x, y] = bomb[i].map(v => v - 1);
		
		if (x >= N || y >= N || x < 0 || y < 0) continue;
		
		let plusN = board[x][y] === '@' ? 2 : 1;
		if (bombBoard[x][y] !== '#') bombBoard[x][y] += plusN

		dxdy.forEach(([dx, dy]) => {
			if (x+dx < 0 || y+dy < 0 || x+dx >=N || y+dy >= N || board[x+dx][y+dy] === '#') return;
			plusN = board[x + dx][y + dy] === '@' ? 2 : 1;
			
			bombBoard[x + dx][y + dy] += plusN;
		})
	}
	
	for (let i = 0; i < bombBoard.length; i++) {
		for (let j = 0; j < bombBoard.length; j++) {
			if (bombBoard[i][j] === '#') continue;
			max = Math.max(bombBoard[i][j], max)
		}
	}
	console.log(max)
}
