const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const width = (canvas.width = window.innerWidth);
const height = (canvas.height = window.innerHeight);

function random(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function randomColor() {
  return `rgb(${random(0, 255)}, ${random(0, 255)}, ${random(0, 255)})`;
}

function createObject(source) {
  function fn() {}
  fn.prototype = source;
  return new fn();
}

function Shape(x, y, velocityX, velocityY, exists) {
  // 坐标
  this.x = x;
  this.y = y;
  // 水平和竖直速度
  this.velocityX = velocityX;
  this.velocityY = velocityY;
  this.exists = exists;
}

function Ball(x, y, velocityX, velocityY, exists, color, size) {
  Shape.call(this, x, y, velocityX, velocityY, exists);

  this.color = color;
  this.size = size;
}

// 为了继承其原型的内容
Ball.prototype = createObject(Shape.prototype);
Ball.prototype.constructor = Ball;

Ball.prototype.draw = function () {
  ctx.beginPath();
  ctx.fillStyle = this.color;
  ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
  ctx.fill();
};
Ball.prototype.update = function () {
  if (this.x + this.size >= width) {
    this.velocityX = -this.velocityX;
  }

  if (this.x - this.size <= 0) {
    this.velocityX = -this.velocityX;
  }

  if (this.y + this.size >= height) {
    this.velocityY = -this.velocityY;
  }

  if (this.y - this.size <= 0) {
    this.velocityY = -this.velocityY;
  }

  this.x += this.velocityX;
  this.y += this.velocityY;
};
Ball.prototype.collisionDetect = function () {
  for (let i = 0; i < balls.length; i++) {
    if (this !== balls[i]) {
      const dx = this.x - balls[i].x;
      const dy = this.y - balls[i].y;
      // 等腰三角形求长边，两等腰平方相加值的平方根等于长边值
      const distance = Math.sqrt(dx * dx + dy * dy);

      // 两球半径相加大于两球圆心距离
      if (distance < this.size + balls[i].size && balls[i].exists) {
        balls[i].color = this.color = randomColor();
      }
    }
  }
};

function EvilCircle(x, y, exists) {
  Shape.call(this, x, y, 20, 20, exists);

  this.color = 'white';
  this.size = 10;
}

EvilCircle.prototype = Object.create(Shape.prototype);
EvilCircle.prototype.constructor = EvilCircle;

EvilCircle.prototype.draw = function () {
  ctx.beginPath();
  ctx.lineWidth = 3;
  ctx.strokeStyle = this.color;
  ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
  ctx.stroke();
};

EvilCircle.prototype.checkBounds = function () {
  if (this.x + this.size >= width) {
    this.x -= this.size;
  }

  if (this.x - this.size <= 0) {
    this.x += this.size;
  }

  if (this.y + this.size >= height) {
    this.y -= this.size;
  }

  if (this.y - this.size <= 0) {
    this.y += this.size;
  }
};

EvilCircle.prototype.setControls = function (e) {
  window.onkeydown = (e) => {
    switch (e.key) {
      case 'a':
      case 'A':
      case 'ArrowLeft':
        this.x -= this.velocityX;
        break;
      case 'd':
      case 'D':
      case 'ArrowRight':
        this.x += this.velocityX;
        break;
      case 'w':
      case 'W':
      case 'ArrowUp':
        this.y -= this.velocityY;
        break;
      case 's':
      case 'S':
      case 'ArrowDown':
        this.y += this.velocityY;
        break;
    }
  };
};

EvilCircle.prototype.collisionDetect = function () {
  for (let i = 0; i < balls.length; i++) {
    if (balls[i].exists) {
      const dx = this.x - balls[i].x;
      const dy = this.y - balls[i].y;
      // 等腰三角形求长边，两等腰平方相加值的平方根等于长边值
      const distance = Math.sqrt(dx * dx + dy * dy);

      // 两球半径相加大于两球圆心距离
      if (distance < this.size + balls[i].size) {
        balls[i].exists = false;
      }
    }
  }
};

let balls = [];

while (balls.length < 25) {
  let size = random(10, 20);
  let ball = new Ball(
    random(0 + size, width - size),
    random(0 + size, height - size),
    random(-7, 7),
    random(-7, 7),
    true,
    randomColor(),
    size
  );
  balls.push(ball);
}

const evil = new EvilCircle(random(0, width), random(0, height), true);
evil.setControls();

function loop() {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
  ctx.fillRect(0, 0, width, height);

  for (let i = 0; i < balls.length; i++) {
    if (balls[i].exists) {
      balls[i].draw();
      balls[i].update();
      balls[i].collisionDetect();
    }
  }

  evil.draw();
  evil.checkBounds();
  evil.collisionDetect();
  console.log('剩余：', balls.filter((v) => v.exists).length);
  requestAnimationFrame(loop);
}

loop();
