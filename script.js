//Select DOM elements
const container = document.querySelector('#grid-container');
const clearBtn = document.querySelector('#clear');
const rainbowBtn = document.querySelector('#rainbow');
const gridSet = document.querySelector('#grid-set');

//Initialize variables
let rainbowMode = false;
let gridSize = 16;
let squareSize = '43.75px';

createGrid();
colorBox();

//Creates grid in DOM
function createGrid() {
    for (let i = 0; i < gridSize**2; i++) {
        let gridBox = document.createElement('div');
        gridBox.classList.add('box');
        gridBox.style.width = squareSize;
        gridBox.style.height = squareSize;
        container.appendChild(gridBox);
        container.style.gridTemplateColumns = 'repeat(' + gridSize + ', ' + squareSize + ')';
    };
};

//Removes a grid so a new one can be created
function removeGrid(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    };
};

//Allows boxes to be colored when moused over
function colorBox() {
    let box = document.querySelectorAll('.box');

    box.forEach(item => {
        item.addEventListener('mouseover', event => {
            if (rainbowMode == false) {
                item.style.backgroundColor = 'black';
            } else {
                item.style.backgroundColor = colorRandom();
            };
        });
    }); 
} 

gridSet.addEventListener('click', resizeGrid);

//Creates a new grid based on user prompt
function resizeGrid() {
    promptResult = prompt('How many squares per side? Pick a number from 2 to 100.');
    if (promptResult > 1 && promptResult < 101){
        gridSize = promptResult;
        removeGrid(container);
        squareSize = boxCalc(gridSize) + 'px';
        createGrid();
        colorBox();
    };
};

//Calculates what the size per box should be
function boxCalc(gridSize) {
    let containerSize = 700*700;
    let divSize = gridSize**2;
    let newSquare = Math.sqrt(containerSize/divSize);
    return newSquare;
};

clearBtn.addEventListener('click', resetGrid);
rainbowBtn.addEventListener('click', colorToggle);

//Picks a random color
function colorRandom() {
    return '#' + Math.floor(Math.random()*16777215).toString(16);
};

//Toggles random mode on or off
function colorToggle() {
    if (rainbowMode == false) {
        rainbowMode = true;
        rainbowBtn.textContent = 'Use single color mode';
    } else {
        rainbowMode = false;
        rainbowBtn.textContent = 'Use random color mode';
    };
};

//Clears grid
function resetGrid() {
    let box = document.querySelectorAll('.box');

    box.forEach(item => {
        item.style.backgroundColor = null;
    });
};