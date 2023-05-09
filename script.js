const gridContainer = document.querySelector('.grid-container');

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

// Set the hover color to black for each square in the grid
function setBlackColorHover() {
	gridContainer.addEventListener('mouseover', function (event) {
		if (event.target.classList.contains('grid-square')) {
			event.target.style.backgroundColor = 'black';
		}
	});
}

// Set the hover color to the selected color from the color picker
function setColorPickerHover() {
	const colorPicker = document.querySelector('#colorChoice');

	gridContainer.addEventListener('mouseover', function (event) {
		if (event.target.classList.contains('grid-square')) {
			event.target.style.backgroundColor = colorPicker.value;
		}
	});

	colorPicker.addEventListener('input', function (event) {
		gridContainer.removeEventListener('mouseover', setBlackColorHover);
		gridContainer.removeEventListener('mouseover', setRainbowColorHover);
		gridContainer.removeEventListener('mouseover', eraseSquareGrid);

		gridContainer.addEventListener('mouseover', function (event) {
			if (event.target.classList.contains('grid-square')) {
				event.target.style.backgroundColor = colorPicker.value;
			}
		});
	});
}

// Set a random hover color for each square in the grid
function setRainbowColorHover() {
	const rainbowBtn = document.querySelector('#btnRainbow');

	rainbowBtn.addEventListener('click', () => {
		gridContainer.removeEventListener('mouseover', setBlackColorHover);

		gridContainer.addEventListener('mouseover', function (event) {
			if (event.target.classList.contains('grid-square')) {
				const randomR = Math.floor(Math.random() * 256);
				const randomG = Math.floor(Math.random() * 256);
				const randomB = Math.floor(Math.random() * 256);
				const randomColor = `rgb(${randomR},${randomG},${randomB})`;
				event.target.style.backgroundColor = randomColor;
			}
		});
	});
}

// Set the hover color to the background color (erase the color)
function eraseSquareGrid() {
	const eraseBtn = document.querySelector('#btnErase');

	eraseBtn.addEventListener('click', () => {
		gridContainer.removeEventListener('mouseover', setRainbowColorHover);

		gridContainer.addEventListener('mouseover', function (event) {
			if (event.target.classList.contains('grid-square')) {
				event.target.style.backgroundColor = '';
			}
		});
	});
}

// Clean up the entire grid
function clearGrid() {
	const clearBtn = document.querySelector('#btnClear');

	clearBtn.addEventListener('click', () => {
		const squares = document.querySelectorAll('.grid-square');
		squares.forEach((square) => square.remove());
		createGrid(16);
		setBlackColorHover();
	});
}

// Create a new grid with the selected size from the slider
function resetGrid() {
	const slider = document.querySelector('#btnSize');
	const gridSizeLabel = document.querySelector('#size-label');

	slider.addEventListener('input', () => {
		const size = slider.value;
		gridSizeLabel.textContent = `${size} x ${size}`;
		const squares = document.querySelectorAll('.grid-square');
		squares.forEach((square) => square.remove());
		createGrid(size);
		setBlackColorHover();
	});
}

function initialize() {
	createGrid(16);
	setBlackColorHover();
	setColorPickerHover();
	setRainbowColorHover();
	eraseSquareGrid();
	clearGrid();
	resetGrid();
}

initialize();
