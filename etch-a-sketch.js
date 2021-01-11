// select elements
const canvas = document.querySelector('#etch-a-sketch');
const ctx = canvas.getContext('2d');
const shakeButton = document.querySelector('.shake');
const smallButton = document.querySelector('.sizeSmall');
const medButton = document.querySelector('.sizeMed');
const largeButton = document.querySelector('.sizeLarge');
const xlButton = document.querySelector('.sizeXl');
const round  = document.querySelector('.round');
const square = document.querySelector('.square');
const MOVE_AMOUNT = 10;
// setup canvas
const { width, height } = canvas;

// create varables to support start
let x = Math.floor(Math.random() * width); //eslint-disable-line
let y = Math.floor(Math.random() * height); //eslint-disable-line
ctx.lineJoin = 'round';
ctx.lineCap = 'round';
ctx.lineWidth = '15';

let hue = 0;
ctx.strokeStyle = `hsl(${hue},100%,50%)`;
ctx.beginPath();
ctx.moveTo(x, y);
ctx.lineTo(x, y);
ctx.stroke();
// write draw
function draw({ key }) {
  hue += 5;
  ctx.strokeStyle = `hsl(${hue},100%,50%)`;
  console.log(key);
  ctx.beginPath();
  ctx.moveTo(x, y);
  switch (key) {
    case 'ArrowUp':
      y -= MOVE_AMOUNT;
      break;
    case 'ArrowDown':
      y += MOVE_AMOUNT;
      break;
    case 'ArrowLeft':
      x -= MOVE_AMOUNT;
      break;
    case 'ArrowRight':
      x += MOVE_AMOUNT;
      break;
    default:
      break;
  }
  ctx.lineTo(x, y);
  ctx.stroke();
}
// key handler
function handleKey(e) {
  if (e.key.includes('Arrow')) {
    e.preventDefault();
    draw({ key: e.key });
  }
}

// shake function
function clearCanvas() {
  canvas.classList.add('shake');
  ctx.clearRect(0, 0, 2000, 3200);
  canvas.addEventListener(
    'animationend',
    function () {
      canvas.classList.remove('shake');
    },
    { once: true }
  );
}

// listen for events
window.addEventListener('keydown', handleKey);
shakeButton.addEventListener('click', clearCanvas);
smallButton.addEventListener('click', function(){ctx.lineWidth = '15'});
medButton.addEventListener('click', function(){ctx.lineWidth = '50'});
largeButton.addEventListener('click', function(){ctx.lineWidth = '75'});
xlButton.addEventListener('click', function(){ctx.lineWidth = '125'});
round.addEventListener('click', function(){ctx.lineCap = 'round'});
square.addEventListener('click', function(){ctx.lineCap = 'square'});
