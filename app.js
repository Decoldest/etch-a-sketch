const DEFAULT_COLOR = 'black'
const DEFAULT_SIZE = 16

const display = document.querySelector('.pixel-container');
const dimensionSlider = document.getElementById('gridDimension');
const currDimensionDisplay = document.getElementById('currentDimension');
const screenDimension = display.clientWidth;
let gridDimension = DEFAULT_SIZE;
let pixelColor = DEFAULT_COLOR;
let isClick = false;

function displayDimensions(){
  currDimensionDisplay.textContent = gridDimension + " X " + gridDimension;
}

dimensionSlider.oninput = function(){
  gridDimension = this.value;
  displayDimensions();
}

window.addEventListener('mouseup', () =>{
  if(isClick) isClick = !isClick;
});

function setPixels(screenDimension, gridDimension) {
  const fragment = document.createDocumentFragment();

  for (let i = gridDimension * gridDimension; i > 0; i--) {
    const pixel = document.createElement('div');
    pixel.classList.add('pixel');
    pixel.style.width = (screenDimension / gridDimension) + 'px';
    pixel.style.height = (screenDimension / gridDimension) + 'px';

    fragment.appendChild(pixel);
  }
  display.innerHTML = '';
  display.appendChild(fragment);
  addPixelListener(pixelColor);
}

function addPixelListener(pixelColor){
  const drawnPixels = Array.from(document.querySelectorAll('div.pixel'));
  for (const pixel of drawnPixels) {
    pixel.addEventListener('mouseenter', () => {
      if (isClick){
        if (pixelColor === 'rainbow'){
          pixel.style.backgroundColor = randomColor();
        }
        else{
          pixel.style.backgroundColor = pixelColor;
        }
      }
    });
    pixel.addEventListener('mousedown', () => {
      isClick = true;
      if (pixelColor === 'rainbow'){
        pixel.style.backgroundColor = randomColor();
      }
      else{
        pixel.style.backgroundColor = pixelColor;
      }
    });
  }
}

function randomColor(){
  return "#" + ((1 << 24) * Math.random() | 0).toString(16).padStart(6, "0");
}

const eraserButton = document.querySelector('#eraser');
eraserButton.addEventListener('click', () => {
  pixelColor = 'white';
  addPixelListener(pixelColor);
});

const pencilButton = document.querySelector('#pencil');
pencilButton.addEventListener('click', () => {
  pixelColor = 'black';
  addPixelListener(pixelColor);
});

const ranbowButton = document.querySelector('#rainbow');
ranbowButton.addEventListener('click', () => {
  pixelColor = 'rainbow';
  addPixelListener(pixelColor);
});

const setDimensionButton = document.getElementById('resetDimension');
setDimensionButton.addEventListener('click', () =>{
  display.innerHTML = "";
  setPixels(screenDimension, gridDimension);
});


setPixels(screenDimension, gridDimension);
displayDimensions();
