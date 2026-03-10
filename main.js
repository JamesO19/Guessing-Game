let target = Math.floor(Math.random() * 10) + 1;
let attempts = 0;

const message = document.getElementById('message');
const attemptDisplay = document.getElementById('attempt-count');
const resetbtn = document.getElementById('reset-btn');

document.getElementById('game-form').onsubmit = function(event) {

    if (resetbtn.style.display === "block") {
        return;
    }

    event.preventDefault();
    const guess = Number(document.getElementById('guess').value);
    
    attempts++;
    attemptDisplay.textContent = attempts;

    if (guess === target) {
        message.textContent = `🎉 Correct! It took you ${attempts} tries.`;
        message.style.color = "green";
        endGame();
    } else if (guess > target) {
        message.textContent = "Too high! Try lower.";
        message.style.color = "red";
    } else {
        message.textContent = "Too low! Try higher.";
        message.style.color = "red";
    }
};

function endGame() {
    resetbtn.style.display = "block";
    document.getElementById("submit-btn").style.display = "none";
    document.getElementById("guess").disabled = true;
};

resetbtn.onclick = function() {
    target = Math.floor(Math.random() * 10) + 1;
    attempts = 0;

    attemptDisplay.textContent = "0";
    message.textContent = "";
    document.getElementById('guess').value = "";

    resetbtn.style.display = "none";
    document.getElementById("submit-btn").style.display = "block";

    document.getElementById("guess").disabled = false;
    document.getElementById("guess").focus(); 
};
