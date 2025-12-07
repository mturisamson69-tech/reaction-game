const startBtn = document.getElementById('startBtn');
const box = document.getElementById('box');
const message = document.getElementById('message');
const result = document.getElementById('result');
const leaderboardDiv = document.createElement('div');
leaderboardDiv.id = 'leaderboard';
document.getElementById('container').appendChild(leaderboardDiv);

let startTime;
let delay = 2000; // initial delay
let leaderboard = JSON.parse(localStorage.getItem('reactionScores')) || [];

function updateLeaderboard() {
  leaderboardDiv.innerHTML = "<h3>Leaderboard</h3>";
  let sorted = leaderboard.sort((a, b) => a - b).slice(0, 5);
  sorted.forEach((time, i) => {
    leaderboardDiv.innerHTML += `${i + 1}. ${time} ms <br>`;
  });
}

updateLeaderboard();

startBtn.addEventListener('click', () => {
  result.textContent = "";
  message.textContent = "Wait for the box...";
  box.style.display = 'none';

  const randomDelay = Math.random() * delay + 500;

  setTimeout(() => {
    const screenWidth = window.innerWidth - 150;
    const screenHeight = window.innerHeight - 150;

    const randomX = Math.random() * screenWidth;
    const randomY = Math.random() * screenHeight;

    box.style.left = randomX + 'px';
    box.style.top = randomY + 'px';

    box.style.display = 'block';
    box.style.background = 'green';
    startTime = Date.now();
    message.textContent = "Tap it!";
  }, randomDelay);
});

box.addEventListener('click', () => {
  const reactionTime = Date.now() - startTime;
  result.textContent = `Your reaction time: ${reactionTime} ms`;
  message.textContent = "Tap start to try again!";

  leaderboard.push(reactionTime);
  localStorage.setItem('reactionScores', JSON.stringify(leaderboard));
  updateLeaderboard();

  box.style.display = 'none';

  // speed up game each hit
  if (delay > 400) delay -= 100;
});

// Game Over Screen
let gameOverScreen = document.createElement('div');
gameOverScreen.id = 'gameOver';
gameOverScreen.style.position = 'fixed';
gameOverScreen.style.top = '0';
gameOverScreen.style.left = '0';
gameOverScreen.style.width = '100%';
gameOverScreen.style.height = '100%';
gameOverScreen.style.background = 'rgba(0,0,0,0.8)';
gameOverScreen.style.display = 'none';
gameOverScreen.style.justifyContent = 'center';
gameOverScreen.style.alignItems = 'center';
gameOverScreen.style.color = 'white';
gameOverScreen.style.fontSize = '32px';
gameOverScreen.style.flexDirection = 'column';
gameOverScreen.style.zIndex = '999';
document.body.appendChild(gameOverScreen);

let restartBtn = document.createElement('button');
restartBtn.textContent = 'Restart';
restartBtn.style.marginTop = '20px';
restartBtn.style.padding = '10px 20px';
restartBtn.style.fontSize = '20px';
restartBtn.style.border = 'none';
restartBtn.style.borderRadius = '10px';
restartBtn.style.cursor = 'pointer';
restartBtn.style.background = '#007bff';
restartBtn.style.color = 'white';
gameOverScreen.appendChild(restartBtn);

restartBtn.addEventListener('click', () => {
  gameOverScreen.style.display = 'none';
  delay = 2000;
  message.textContent = 'Tap start to begin!';
});

function triggerGameOver() {
  gameOverScreen.innerHTML = '<div>GAME OVER<br>Your speed is maxed!</div>';
  gameOverScreen.appendChild(restartBtn);
  gameOverScreen.style.display = 'flex';
}

