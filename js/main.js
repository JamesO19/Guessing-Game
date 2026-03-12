let target = Math.floor(Math.random() * 100) + 1;
let attempts = 0;
let prevGuess = null;

const message = document.getElementById('message');
const attemptDisplay = document.getElementById('attempt-count');
const resetbtn = document.getElementById('reset-btn');
const input = document.getElementById('guess');
const submitbtn = document.getElementById("submit-btn");

input.addEventListener('input', function() {
    this.value = this.value.replace(/[^0-9]/g, '');

    if (parseInt(this.value) > 100) {
        this.value = 100;
    }

    submitbtn.disabled = !this.checkValidity();
});


document.getElementById('game-form').onsubmit = function(event) {

    if (resetbtn.style.display === "block") {
        return;
    }

    event.preventDefault();
    const guess = Number(input.value);

    if (prevGuess === guess) {
        message.textContent = "You just guessed that, try again!";
        message.style.color = "red";
        return;
    }

    attempts++

    attemptDisplay.textContent = attempts;

    if (guess === target) {
        message.textContent = `🎉 Correct! It took you ${attempts} tries.`;
        message.style.color = "green";
        endGame();
    } else if (guess > target) {
        message.textContent = "Too high! Try lower.";
        message.style.color = "red";
        prevGuess = guess;
    } else {
        message.textContent = "Too low! Try higher.";
        message.style.color = "red";
        prevGuess = guess;

    }

    if (attempts >= 25) {
        attemptDisplay.style.color = "red";
    } else if (attempts > 10) {
        attemptDisplay.style.color = "#FFBF00";
    } else {
        attemptDisplay.style.color = "green";
    }
};

function endGame() {
    resetbtn.style.display = "block";
    document.getElementById("submit-btn").style.display = "none";
    document.getElementById("guess").disabled = true;
};

resetbtn.onclick = function() {
    target = Math.floor(Math.random() * 100) + 1;
    attempts = 0;

    attemptDisplay.textContent = "0";
    message.textContent = "";
    document.getElementById('guess').value = "";
    prevGuess = 0;

    resetbtn.style.display = "none";
    document.getElementById("submit-btn").style.display = "block";

    document.getElementById("guess").disabled = false;
    document.getElementById("guess").focus(); 
};
