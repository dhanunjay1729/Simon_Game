let sequence = []; // Array to store the sequence of random numbers
let playerSequence = []; // Array to store the player's sequence of clicks
let level = 0; // Variable to track the current level
let started = false; // Flag to track if the game has started

// Function to start the game when any key is pressed
document.addEventListener("keypress", function() {
    if (!started) {
        started = true;
        const line = document.getElementById('inst'); // Get instruction element
        line.textContent = "Repeat the sequence";
        nextSequence();
    }
});

// Function to handle box clicks
document.addEventListener('DOMContentLoaded', () => {
    // Get all the box elements
    const boxes = document.querySelectorAll('.box');

    // Add a click event listener to each box
    boxes.forEach((box, index) => {
        box.addEventListener('click', () => {
            if (started) {
                // Add clicked box index to player's sequence
                playerSequence.push(index);

                // Check if player's sequence matches current sequence
                if (playerSequence[playerSequence.length - 1] !== sequence[playerSequence.length - 1]) {
                    // Handle incorrect click (game over)
                    gameOver();
                } else {
                    // Add flash effect to clicked box
                    flashBox(box);

                    // Check if player's sequence matches entire sequence
                    if (playerSequence.length === sequence.length) {
                        // Proceed to next level after a delay
                        setTimeout(() => {
                            nextSequence();
                        }, 500);
                    }
                }
            }
        });
    });
});

// Function to advance to the next level
function nextSequence() {
    playerSequence = []; // Reset player's sequence
    level++; // Increment level
    const line = document.getElementById('inst');
    line.textContent = `Level ${level}`; // Update instruction text

    // Generate new random number and add to sequence
    let randomNumber = getRandomInt(0, 3);
    sequence.push(randomNumber);

    // Display the sequence by flashing boxes
    sequence.forEach((num, index) => {
        setTimeout(() => {
            const box = document.querySelector(`.box[data-color="${num}"]`);
            flashBox(box);
        }, (index + 1) * 500); // Flash boxes with a delay
    });
}

// Function to handle game over
function gameOver() {
    const line = document.getElementById('inst');
    line.textContent = "Game Over! Press any key to restart."; // Update instruction text

    // Reset game variables
    sequence = [];
    playerSequence = [];
    level = 0;
    started = false;
}

// Function to generate a random integer between min and max (inclusive)
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Function to add flash effect to a box element
function flashBox(box) {
    box.classList.add('flash');
    setTimeout(() => {
        box.classList.remove('flash');
    }, 250); // Flash duration
}
