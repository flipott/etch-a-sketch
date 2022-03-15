const container = document.querySelector('#container');
const clearBtn = document.querySelector('#clear');
const rainbowBtn = document.querySelector('#rainbow');
const gridSet = document.querySelector('#grid-set');


let rainbowMode = false;
let gridSize = 16;

//Creates div boxes in DOM based on number
for (let i = 0; i < gridSize**2; i++) {
    let gridBox = document.createElement('div');
    gridBox.classList.add('box');
    container.appendChild(gridBox);
};

const box = document.querySelectorAll('.box');


box.forEach(item => {
    item.addEventListener('mouseover', event => {
        if (rainbowMode == false) {
            item.style.backgroundColor = "black"
        } else {
            item.style.backgroundColor = colorRandom()
        };
    });
});  

gridSet.addEventListener('click', resizeGrid)

function resizeGrid() {
    gridSize = prompt("How many squares per side? Pick a number from 1 to 100.")
    container.style.gridTemplateColumns = "repeat(" + gridSize + ", 40px)"
}


clearBtn.addEventListener('click', resetGrid);
rainbowBtn.addEventListener('click', colorToggle);

//Picks a random color
function colorRandom() {
    return "#" + Math.floor(Math.random()*16777215).toString(16);
};

//Toggles random mode on or off
function colorToggle() {
    if (rainbowMode == false) {
        rainbowMode = true;
        rainbowBtn.textContent = "Use single color mode";
    } else {
        rainbowMode = false;
        rainbowBtn.textContent = "Use random color mode";
    };
};

//Clears grid
function resetGrid() {
    box.forEach(item => {
        item.style.backgroundColor = null;
});
};