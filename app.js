const display = document.querySelector('.pixel-container');
const dimensionSlider = document.getElementById('gridDimension');
const currDimensionDisplay = document.getElementById('currentDimension');
const screenDimension = display.clientHeight;
let gridDimension = 16;
let pixelColor = 'black';
let isClick = false;

function displayDimensions(){
  currDimensionDisplay.textContent = gridDimension + " X " + gridDimension;
  console.log(screenDimension);
  console.log(gridDimension);
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
    pixel.style.width = screenDimension / gridDimension + 'px';
    pixel.style.height = screenDimension / gridDimension + 'px';
    pixel.style.outline = '1px solid gainsboro';
    
    fragment.appendChild(pixel);
  }
  display.appendChild(fragment);
  addPixelListener(pixelColor);
}


function addPixelListener(pixelColor){
  const drawnPixels = Array.from(document.querySelectorAll('div.pixel'));
  for (const pixel of drawnPixels) {
    pixel.addEventListener('mouseenter', () => {
      if (isClick){
        pixel.style.backgroundColor = pixelColor;
        //console.log(pixelColor);
      }
    });
    pixel.addEventListener('mousedown', () => {
      isClick = true;
      pixel.style.backgroundColor = pixelColor;
    });
  }
}

const eraser = document.querySelector('#eraser');
eraser.addEventListener('click', () => {
  pixelColor = 'white';
  addPixelListener(pixelColor);
});

const pencil = document.querySelector('#pencil');
pencil.addEventListener('click', () => {
  pixelColor = 'black';
  addPixelListener(pixelColor);
});

const setDimensionButton = document.getElementById('resetDimension');
setDimensionButton.addEventListener('click', () =>{
  display.innerHTML = "";
  setPixels(screenDimension, gridDimension);
});



setPixels(screenDimension, gridDimension);
displayDimensions();
