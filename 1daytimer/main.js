let maxTime = localStorage.getItem('maxTime') ? parseInt(localStorage.getItem('maxTime')) : 86400;
let timeLeft = localStorage.getItem('timeLeft') ? parseInt(localStorage.getItem('timeLeft')) : maxTime;
let lastUpdateTime = localStorage.getItem('lastUpdateTime') ? parseInt(localStorage.getItem('lastUpdateTime')) : Date.now();
let isTimerRunning = false;
let isTimerFinished = false;
let timerInterval;

function setMaxTime(event) {
    event.preventDefault();
    const timeInput = document.getElementById('maxTime').value;
    const [hours, minutes] = timeInput.split(':');
    maxTime = parseInt(hours) * 3600 + parseInt(minutes) * 60;
    localStorage.setItem('maxTime', maxTime);
    timeLeft = maxTime;
    updateLocalStorage();
    updateTimerDisplay();
}

function startTimer() {
    if (!isTimerRunning && !isTimerFinished) {
        isTimerRunning = true;
        lastUpdateTime = Date.now();
        timerInterval = setInterval(updateTimer, 1000);
    }
}

function stopTimer() {
    if (isTimerRunning) {
        isTimerRunning = false;
        clearInterval(timerInterval);
        updateLocalStorage();
    }
}

function updateTimer() {
    const currentTime = Date.now();
    const elapsedSeconds = Math.floor((currentTime - lastUpdateTime) / 1000);
    lastUpdateTime = currentTime;

    if (timeLeft > elapsedSeconds) {
        timeLeft -= elapsedSeconds;
        updateTimerDisplay();
        updateLocalStorage();
    } else {
        timeLeft = 0;
        updateTimerDisplay();
        stopTimer();
        playBuzzer();
        isTimerFinished = true;
    }
}

function updateTimerDisplay() {
    const hours = Math.floor(timeLeft / 3600);
    const minutes = Math.floor((timeLeft % 3600) / 60);
    const seconds = timeLeft % 60;

    document.getElementById('timer').textContent = 
        `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function updateLocalStorage() {
    localStorage.setItem('timeLeft', timeLeft);
    localStorage.setItem('lastUpdateTime', lastUpdateTime);
}

function playBuzzer() {
    const audio = new Audio('buzzer.mp3');
    audio.play().catch(error => console.error('音声の再生に失敗しました:', error));
}

function resetTimer() {
    const now = new Date();
    if (now.getHours() === 0 && now.getMinutes() === 0 && now.getSeconds() === 0) {
        timeLeft = maxTime;
        isTimerFinished = false;
        updateTimerDisplay();
        updateLocalStorage();
    }
    setTimeout(resetTimer, 1000);
}

function initializeTimer() {
    const currentTime = Date.now();
    const elapsedSeconds = Math.floor((currentTime - lastUpdateTime) / 1000);
    
    if (timeLeft > elapsedSeconds) {
        timeLeft -= elapsedSeconds;
    } else {
        timeLeft = 0;
        isTimerFinished = true;
    }
    
    updateTimerDisplay();
    updateLocalStorage();
}

document.getElementById('timeForm').addEventListener('submit', setMaxTime);
document.getElementById('startButton').addEventListener('click', startTimer);
document.getElementById('stopButton').addEventListener('click', stopTimer);

// 初期化
initializeTimer();
resetTimer();
