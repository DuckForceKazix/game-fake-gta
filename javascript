<!DOCTYPE html>
<html>
<head>
  <title>Mini GTA JS</title>
  <style>
    body { margin: 0; overflow: hidden; background: #222; }
    canvas { display: block; }
  </style>
</head>
<body>
<canvas id="game"></canvas>

<script>
const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Player
let player = {
  x: 200,
  y: 200,
  size: 20,
  speed: 3,
  inCar: false
};

// Carro
let car = {
  x: 400,
  y: 300,
  width: 40,
  height: 20,
  speed: 5
};

let keys = {};

// Controles
document.addEventListener("keydown", e => keys[e.key] = true);
document.addEventListener("keyup", e => keys[e.key] = false);

// Entrar/sair do carro
document.addEventListener("keydown", e => {
  if (e.key === "e") {
    let dist = Math.hypot(player.x - car.x, player.y - car.y);
    if (dist < 50) {
      player.inCar = !player.inCar;
    }
  }
});

// Atualização
function update() {
  if (player.inCar) {
    // Controle do carro
    if (keys["ArrowUp"]) car.y -= car.speed;
    if (keys["ArrowDown"]) car.y += car.speed;
    if (keys["ArrowLeft"]) car.x -= car.speed;
    if (keys["ArrowRight"]) car.x += car.speed;

    // Player segue o carro
    player.x = car.x;
    player.y = car.y;
  } else {
    // Controle do player
    if (keys["ArrowUp"]) player.y -= player.speed;
    if (keys["ArrowDown"]) player.y += player.speed;
    if (keys["ArrowLeft"]) player.x -= player.speed;
    if (keys["ArrowRight"]) player.x += player.speed;
  }
}

// Desenho
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Fundo (cidade simples)
  ctx.fillStyle = "#444";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Carro
  ctx.fillStyle = "red";
  ctx.fillRect(car.x, car.y, car.width, car.height);

  // Player
  if (!player.inCar) {
    ctx.fillStyle = "white";
    ctx.fillRect(player.x, player.y, player.size, player.size);
  }

  // Texto
  ctx.fillStyle = "white";
  ctx.fillText("Setas: mover | E: entrar/sair do carro", 20, 30);
}

// Loop do jogo
function gameLoop() {
  update();
  draw();
  requestAnimationFrame(gameLoop);
}

gameLoop();
</script>
</body>
</html>
