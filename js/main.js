let winStreak = parseInt(localStorage.getItem("winStreak")) || 0;
let maxRange = 100;
let target = Math.floor(Math.random() * maxRange) + 1;
let attempts = 0;
let prevGuess = null;
let history = [];
let isHardMode = false;

const diffbtn = document.getElementById("difficulty-btn");
const message = document.getElementById('message');
const attemptDisplay = document.getElementById('attempt-count');
const resetbtn = document.getElementById('reset-btn');
const input = document.getElementById('guess');
const submitbtn = document.getElementById("submit-btn");
const historyDisplay = document.getElementById("history");
const maxAttempts = 10;
const helpModal = document.getElementById('help-modal');
const helpBtn = document.getElementById('help-btn');
const closeHelp = document.getElementById('close-help');

helpBtn.onclick = () => {
    helpModal.showModal();
}

closeHelp.onclick = () => {
    helpModal.close();
}

diffbtn.onclick = function() {
    isHardMode = !isHardMode;

    maxRange = isHardMode ? 200 : 100;
    this.textContent = isHardMode ? "Hard (1-200)" : "Easy (1-100)";
    this.style.background = isHardMode ? "#e74c3c" : "#764ba2";

    input.placeholder = `1 - ${maxRange}`;
    input.max = maxRange;

    resetbtn.click();
};

input.addEventListener('input', function() {
    let val = parseInt(this.value);

    if (val > maxRange) this.value = maxRange;
    if (val < 1 && this.value !== "") this.value = 1;

    submitbtn.disabled = (this.value === "");
});


document.getElementById('game-form').addEventListener('submit', function(event) {
    event.preventDefault();

    if (input.disabled) return;

    const guess = Number(input.value);

    if (isNaN(guess) || guess < 1 || guess > maxRange) {
        message.textContent = `Please enter a number between 1 and ${maxRange}.`;
        return;
    }

    if (prevGuess === guess) {
        message.textContent = "You just guessed that, try again!";
        message.style.color = "red";
        return;
    }

    attempts++;
    attemptDisplay.textContent = attempts;

    history.push(guess);
    historyDisplay.textContent = history.join(", ");

    if (guess === target) {
        message.textContent = `🎉 Correct! It took you ${attempts} tries.`;
        message.style.color = "green";
        winStreak++;
        localStorage.setItem("winStreak", winStreak)
        document.getElementById("streak-count").textContent = winStreak;
        endGame();
    } else if (attempts >= maxAttempts) {
        message.textContent = "Game Over";

        winStreak = 0;
        localStorage.setItem("winstreak", 0);
        document.getElementById("streak-count").textContent = 0;
        endGame();
    } else {
        prevGuess = guess;
        message.style.color = "red";
        if (guess > target) {
            message.textContent = "Too high! Try lower.";
        } else {
            message.textContent = "Too low! Try higher.";
        }
    }
    if (attempts >= 7) {
        attemptDisplay.style.color = "red";
    } else if (attempts > 5) {
        attemptDisplay.style.color = "#FFBF00";
    } else {
        attemptDisplay.style.color = "green";
    }

    input.select();
    submitbtn.disabled = true;
    input.focus();
});


function endGame() {
    resetbtn.style.display = "block";
    submitbtn.style.display = "none";
    document.getElementById("guess").disabled = true;
};

resetbtn.onclick = function() {
    target = Math.floor(Math.random() * maxRange) + 1;
    attempts = 0;
    prevGuess = null;
    history = [];

    attemptDisplay.textContent = "0";
    historyDisplay.textContent = "None";
    message.textContent = "New game started! Guess a number.";
    message.style.color = "black";
    attemptDisplay.style.color = "green";
    
    input.value = "";
    input.disabled = false;
    
    resetbtn.style.display = "none";
    submitbtn.style.display = "block";
    submitbtn.disabled = true;
    
    input.focus(); 
};

document.getElementById('streak-count').textContent = winStreak;
