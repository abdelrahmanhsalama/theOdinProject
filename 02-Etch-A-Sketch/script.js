const subContainer = document.querySelector("#subcontainer");
const gameContainer = document.querySelector("#game");
const controlsContainer = document.querySelector("#controls");

const gridInput = document.querySelector(".grid-input");
const gridButton = document.querySelector(".grid-button");
const rainbowButton = document.querySelector(".rainbow-button");
const decreaseDarknessButton = document.querySelector(".decrease-darkness-button");
const increaseDarknessButton = document.querySelector(".increase-darkness-button");
const deleteButton = document.querySelector(".delete-button");
const clearButton = document.querySelector(".clear-button");

let gridSize = 16;
let rainbowMode = false;
let darkness = 1.0;
let deleteMode = false;

function createGrid() {
    for (let i = 0; i < gridSize**2; i++) {
        const box = document.createElement("div");
        box.classList.add("box");
        box.style.width = `calc(100% / ${gridSize})`;
        box.style.height = `calc(100% / ${gridSize})`;
        gameContainer.appendChild(box);
        box.addEventListener("click", function () {
            if (deleteMode == false) {
                if (rainbowMode == false) {
                    box.style.backgroundColor = `rgb(0, 0, 0, ${darkness})`;
                } else {
                    randomColor(box);
                }
            } else {
                box.style.background = "none";
            }
        });
    }
}

function randomColor(box) {
    let colors = [`rgb(255, 0, 0, ${darkness})`, `rgb(255, 165, 0, ${darkness})`, `rgb(255, 255, 0, ${darkness})`, `rgb(0, 128, 0, ${darkness})`, `rgb(0, 0, 255, ${darkness})`, `rgb(75, 0, 130, ${darkness})`, `rgb(128, 0, 128, ${darkness})`];
    let color = Math.floor((Math.random() * 7));
    box.style.backgroundColor = colors[color];
}

function clearGrid() {
    const allBoxes = document.querySelectorAll(".box");
    for (let i = 0; i < allBoxes.length; i++) {
        allBoxes[i].style.background = "none";
    }
}

function checkIncreaseDarknessButton() {
    if (darkness >= 1.0) {
      increaseDarknessButton.disabled = true;
    } else {
      increaseDarknessButton.disabled = false;
    }
};

function checkDecreaseDarknessButton() {
    if (darkness <= 0.1) {
      decreaseDarknessButton.disabled = true;
    } else {
      decreaseDarknessButton.disabled = false;
    }
};

gridButton.addEventListener("click", function () {
    gridSize = Number(gridInput.value);
    if (gridSize > 1 && gridSize < 100) {
        gameContainer.innerHTML = "";
        subContainer.insertBefore(gameContainer, controlsContainer);
        createGrid();
    } else {
        alert("Please type in a number more than 0 and smaller than 100!");
    }
});

rainbowButton.addEventListener("click", function () {
    rainbowMode = !rainbowMode;
    if (rainbowMode) {
        rainbowButton.textContent = "Toggle Black Only";
    } else {
        rainbowButton.textContent = "Toggle Random Colors";
    }
});

deleteButton.addEventListener("click", function () {
    deleteMode = !deleteMode;
    if (deleteMode) {
        deleteButton.textContent = "Toggle Draw Mode";
    } else {
        deleteButton.textContent = "Toggle Delete Mode";
    }
});

decreaseDarknessButton.addEventListener("click", function () {
    darkness -= 0.1;
    checkIncreaseDarknessButton();
    checkDecreaseDarknessButton();
});

increaseDarknessButton.addEventListener("click", function () {
    darkness += 0.1;
    checkIncreaseDarknessButton();
    checkDecreaseDarknessButton();
});

clearButton.addEventListener("click", clearGrid);

createGrid();

checkIncreaseDarknessButton();
checkDecreaseDarknessButton();