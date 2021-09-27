canvas = document.getElementsByTagName('canvas')[0].getContext('2d');
const canvasHeight = 500;
const canvasWidth = 500;
const snake = new Snake(canvasWidth, canvasHeight);
let food = generateFood(canvasWidth, canvasHeight, snake);

document.addEventListener('keydown', (event) => {
  if (event.keyCode == 37 && snake.dx != 1) {
    // left arrow
    snake.dx = -1;
    snake.dy = 0;
  } else if (event.keyCode == 38  && snake.dy != 1) {
    // up arrow
    snake.dy = -1;
    snake.dx = 0;
  } else if (event.keyCode == 39 && snake.dx != -1) {
    // right arrow
    snake.dx = 1;
    snake.dy = 0;
  } else if (event.keyCode == 40  && snake.dy != -1) {
    // down arrow
    snake.dy = 1;
    snake.dx = 0;
  }
})
function generateFood(canvasWidth, canvasHeight, snake) {
  const x = Math.floor(Math.random() * (canvasWidth / snake.width)) * snake.width;
  const y = Math.floor(Math.random() * (canvasHeight / snake.height)) * snake.height;
  return { x, y };
}

 function eat(food, snake) {
  let result = false;
  if(food.x == snake.x && food.y == snake.y){
    result = true;
  }
  return result;
}

function Snake(canvasWidth, canvasHeight) {
  this.x = 0;
  this.y = 0;
  this.dx = 1;
  this.dy = 0;
  this.width = 20;
  this.height = 20;
  this.tail = [];

  this.grow = function () {
    this.tail.push({ x: this.x, y: this.y });
  }

  this.dead = function (){
    for(let i = 0; i < this.tail.length; i++){
      if(this.tail[i].x == this.x && this.tail[i].y == this.y){
        this.tail = [];
        return true;
      }
    }
    return false;
  }

  this.update = function () {
    let x = this.x + this.width * this.dx;
    let y = this.y + this.height * this.dy;
    if (x < 0) {
      x = canvasWidth - this.width;
    } else if (x > canvasWidth - this.width) {
      x = 0;
    }
    if (y < 0) {
      y = canvasHeight - this.height;
    } else if (y > canvasHeight - this.height) {
      y = 0;
    }
    for (let i = 0; i < this.tail.length - 1; i++) {
      this.tail[i] = this.tail[i + 1];
    }
    this.tail[this.tail.length - 1] = { x: this.x, y: this.y };
    this.x = x;
    this.y = y;
  }
  this.show = function (canvas) {
    canvas.fillStyle = 'white';
    canvas.fillRect(this.x, this.y, this.width, this.height);
    for (let i = 0; i < this.tail.length; i++) {
      canvas.fillRect(this.tail[i].x + 2, this.tail[i].y + 2, this.width - 4, this.height - 4);
    }
  }
}

function update() {
  snake.update(canvas);
  if(snake.dead()){
    console.log('Game over');
  }
  if (eat(food, snake)) {
    food = generateFood(canvasWidth, canvasHeight, snake);
    snake.grow();
  }
}

function show() {
  canvas.clearRect(0, 0, canvasWidth, canvasHeight);
  canvas.fillStyle = 'red';
  canvas.fillRect(food.x, food.y, snake.width, snake.height);
  snake.show(canvas);
}

setInterval(() => {
  update();
  show();
}, 200);

