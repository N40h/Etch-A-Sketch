const gridContainer = document.querySelector('.grid-container');
const colorPicker = document.querySelector('#colorChoice');
const rainbowButton = document.querySelector('#btnRainbow');
const eraseButton = document.querySelector('#btnErase');
const clearButton = document.querySelector('#btnClear');
const sizeButton = document.querySelector('#btnSize');
const sizeLabel = document.querySelector('#size-label');
let currentColor = '#000';
let currentMode = 'mono'; // mono | rainbow
let gridSize = 16;

sizeButton.addEventListener('input', (event) => {
	gridSize = event.target.value;
	sizeLabel.innerHTML = gridSize;
	resetGrid();
});

colorPicker.addEventListener('input', (event) => {
	currentColor = event.target.value;
	currentMode = 'mono';
});

gridContainer.addEventListener('mouseover', (event) => {
	if (event.target.classList.contains('grid-square')) {
		fillSquare(event);
	}
});

rainbowButton.addEventListener('click', () => {
	currentMode = 'rainbow';
});

eraseButton.addEventListener('click', () => {
	currentMode = 'mono';
	currentColor = '';
});

clearButton.addEventListener('click', () => {
	resetGrid();
});

// Fill a square with specific color
function fillSquare(event) {
	// Mono Mode
	switch (currentMode) {
		case 'mono':
			event.target.style.backgroundColor = currentColor;
			break;
		case 'rainbow':
			event.target.style.backgroundColor = getRandomRGB();
			break;
	}
}

// Get random RGB color
function getRandomRGB() {
	const randomR = Math.floor(Math.random() * 256);
	const randomG = Math.floor(Math.random() * 256);
	const randomB = Math.floor(Math.random() * 256);
	return `rgb(${randomR},${randomG},${randomB})`;
}

// Create a grid of square with the specified size
function createGrid(size) {
	gridContainer.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
	gridContainer.style.gridTemplateRows = `repeat(${size}, 1fr)`;

	for (let i = 0; i < size * size; i++) {
		const square = document.createElement('div');
		square.className = 'grid-square';
		gridContainer.appendChild(square);
	}
}

// Clean up the entire grid
function resetGrid() {
	gridContainer.innerHTML = '';
	createGrid(gridSize);
}

createGrid(gridSize);
