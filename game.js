let boxes = document.getElementsByClassName("box");
let nGameBtn = document.querySelector("#n-game");
let homeBtn = document.querySelector("#h-btn");
let resetBtn = document.querySelector("#reset");
let winner = document.querySelector(".winner");
let gameOverBtn = document.querySelector(".g-over-container")
let turnOfO = document.querySelector('.turnO');
let turnOfX = document.querySelector('.turnX');
let turn0 = true;

const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

// Function to check if the match is over
function isMatchOver() {
    for (let pattern of winPatterns) {
        let pos1 = boxes[pattern[0]].innerText;
        let pos2 = boxes[pattern[1]].innerText;
        let pos3 = boxes[pattern[2]].innerText;
        if (pos1 != "" && pos2 != "" && pos3 != "") {
            if (pos1 === pos2 && pos2 === pos3) {
                return true; // Match is over
            }
        }
    }
    return false; // Match is not over
}

// Function to show an element for a specified duration
function showElementForDuration(element, duration) {
    if (!isMatchOver()) {
        element.style.visibility = 'visible'; // Make the element visible
        setTimeout(function () {
            element.style.visibility = 'hidden'; // Hide the element after the duration
        }, duration * 1000);
    }
}

// Function to hide an element for a specified duration
function hideElementForDuration(element, duration) {
    element.style.visibility = 'hidden'; // Make the element hidden
    setTimeout(function () {
        element.style.visibility = 'visible'; // Make the element visible after the duration
        checkWinner();
    }, duration * 1000);
}

// Function to show winner message after several second and will be visible only for specific second
function showWinner() {
    setTimeout(function() {
        winner.style.visibility = "visible";
        setTimeout(function () {
            winner.style.visibility = "hidden";
        }, 2000);
    }, 1500);
}

// Function to show an element after a specified duration
function showElementAfterDuration(element, duration) {
    setTimeout(function () {
        element.style.visibility = 'visible';
    }, duration * 1000);
}

showElementForDuration(turnOfO, 1);

for (let i = 0; i < boxes.length; i++) {
    boxes[i].addEventListener("click", (event) => {
        if (!event.target.disabled) {
            if (turn0 === true) {
                turn0 = false;
                boxes[i].innerText = "O";
                event.target.disabled = true; // Disable the button
                hideElementForDuration(reset, 1);
                checkWinner();
                showElementForDuration(turnOfX, 1);
            } else {
                turn0 = true;
                boxes[i].innerText = "X";
                event.target.disabled = true; // Disable the button
                checkWinner();
                showElementForDuration(turnOfO, 1);
            }
        }
    });
}

resetBtn.addEventListener("click", () => {
    for (let i = 0; i < boxes.length; i++) {
        boxes[i].innerText = "";
        boxes[i].disabled = false;
    }
    showElementForDuration(document.querySelector('.turn0'), 1);
});

const checkWinner = () => {
    for (let pattern of winPatterns) {
        let pos1 = boxes[pattern[0]].innerText;
        let pos2 = boxes[pattern[1]].innerText;
        let pos3 = boxes[pattern[2]].innerText;
        if (pos1 != "" && pos2 != "" && pos3 != "") {
            if (pos1 === pos2 && pos2 === pos3) {
                resetBtn.style.visibility = "hidden";
                // turnOfO.style.visibility = "hidden";
                // turnOfX.style.visibility = "hidden";
                winner.innerText = pos1 + " is winner...!!!";
                showWinner();
                showElementAfterDuration(gameOverBtn, 3.5);
                for (let i = 0; i < boxes.length; i++) {
                    boxes[i].disabled = true;
                }
            }
        }
    }
}

nGameBtn.addEventListener("click", () => {
    location.reload();
});

homeBtn.addEventListener("click", () => {
    window.location.href = "home.html";
});


// for (let i = 0; i < boxes.length; i++) {
//     boxes[i].addEventListener("click", (event) => {
//         if (turn0 === true) {
//             turn0 = false;
//             boxes[i].innerText = "0";
//             event.target.disabled = true; // Disables the button
//             console.log(turn0);
//         } else {
//             turn0 = true;
//             boxes[i].innerText = "X";
//             event.target.disabled = true; // Disable the button
//             console.log(turn0);
//         }
//     });
// }