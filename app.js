const DEFAULTS = {
  COLOR: 'black',
  SIZE: 16
};


const display = document.querySelector('.pixel-container');
const dimensionSlider = document.getElementById('gridDimension');
const currDimensionDisplay = document.getElementById('currentDimension');
let gridDimension = DEFAULTS.SIZE;
let pixelColor = DEFAULTS.COLOR;
let isClick = false;

function displayDimensions(){
  currDimensionDisplay.textContent = gridDimension + " X " + gridDimension;
}

dimensionSlider.oninput = () => { 
  gridDimension = dimensionSlider.value; 
  displayDimensions(); 
}

window.addEventListener('mouseup', () => { if(isClick) isClick = !isClick; });

function setPixels(gridDimension) {
  display.innerHTML = '';
  setGridPixels();
  
  for (let i = gridDimension * gridDimension; i > 0; i--) {
    display.appendChild(createPixel());

  }
}

function setGridPixels() {
  display.style.gridTemplateColumns = `repeat(${gridDimension}, 1fr)`;
  display.style.gridTemplateRows = `repeat(${gridDimension}, 1fr)`;
}

function createPixel() {
  const pixel = document.createElement('div');
  pixel.classList.add('pixel');
  pixel.addEventListener('mouseenter', () => handlePixelMouseEnter(pixel));
  pixel.addEventListener('mousedown', () => handlePixelMouseDown(pixel));
  return pixel;
}

function randomColor(){
  return "#" + ((1 << 24) * Math.random() | 0).toString(16).padStart(6, "0");
}

function handlePixelMouseEnter(pixel) {
  if (isClick) {
    pixel.style.backgroundColor = (pixelColor === 'rainbow') ? randomColor() : pixelColor;
  }
}

function handlePixelMouseDown(pixel) {
  isClick = true;
  pixel.style.backgroundColor = (pixelColor === 'rainbow') ? randomColor() : pixelColor;
}

function setupButtonListener(buttonId, color) {
  const button = document.querySelector(buttonId);
  button.addEventListener('click', () => {
    pixelColor = color;
    addPixelListener(pixelColor);
  });
}

setupButtonListener('#eraser', 'white');
setupButtonListener('#pencil', 'black');
setupButtonListener('#rainbow', 'rainbow');

const setDimensionButton = document.getElementById('resetDimension');
setDimensionButton.addEventListener('click', () => {
  display.innerHTML = "";
  setPixels(gridDimension);
});

setPixels(gridDimension);
displayDimensions();
