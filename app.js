const display = document.querySelector('.pixel-container');


const screenWidth = display.clientWidth;
const screenHeight = display.clientHeight;
let dimension = 16;
let pixelDimension;

console.log(screenHeight);

function calcPixelDimensions(){
  pixelDimension = Math.floor(screenHeight/dimension);
}

calcPixelDimensions();


function setPixels(pixelDimension, dimension){
  console.log(dimension + " " + pixelDimension);
  for (let i = dimension * dimension; i > 0 ; i--){
    const pixel = document.createElement('div');
    pixel.style.width = pixelDimension + "px";
    pixel.style.height = pixelDimension + "px";
    pixel.style.outline = '1px solid black';
    display.appendChild(pixel);

  }
}

setPixels(pixelDimension, dimension);