const display = document.querySelector('.pixel-container');

const screenDimension = display.clientHeight;
let ddrawingOption = 'Black';
let gridDimension = 16;
let isClick = false;

display.addEventListener('mouseup', e =>{
  if(isClick) isClick = !isClick;
});

function setPixels(screenDimension, dimension){

  for (let i = dimension * dimension; i > 0 ; i--){
    const pixel = document.createElement('div');
    pixel.classList.add('pixel');
    pixel.style.width = screenDimension/dimension + 'px';
    pixel.style.height = screenDimension/dimension + 'px';
    pixel.style.outline = '1px solid grey';
    pixelListener();
    display.appendChild(pixel);
  }
}

function pixelListener(){
  const drawnPixels = Array.from(document.querySelectorAll('div.pixel'));
  for (const pixel of drawnPixels) {
    pixel.addEventListener('mouseenter', () => {
      if (isClick){
        pixel.style.backgroundColor = 'black';
      }
    });
    pixel.addEventListener('mousedown', e => {
      isClick = true;
      pixel.style.backgroundColor = 'black';
    });
  }
}

setPixels(screenDimension, gridDimension);