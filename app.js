const display = document.querySelector('.pixel-container');
const dimensionSlider = document.getElementById('gridDimension');

const screenDimension = display.clientHeight;
let gridDimension = 16;
let pixelColor = 'black';
let isClick = false;
let count = 0;

dimensionSlider.oninput = function() {
  gridDimension = this.value;
}

window.addEventListener('mouseup', () =>{
  if(isClick) isClick = !isClick;
});

function setPixels(screenDimension, dimension){

  for (let i = dimension * dimension; i > 0 ; i--){
    const pixel = document.createElement('div');
    pixel.classList.add('pixel');
    pixel.style.width = screenDimension/dimension + 'px';
    pixel.style.height = screenDimension/dimension + 'px';
    //pixel.style.outline = '1px solid gainsboro';
    addPixelListener(pixelColor);
    display.appendChild(pixel);
  }
}

const eraser = document.querySelector('#eraser');
eraser.addEventListener('click', () => {
  pixelColor = 'white';
  addPixelListener(pixelColor);
});



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


setPixels(screenDimension, gridDimension);
