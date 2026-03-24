<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <title>Mini GTA JS</title>
  <style>
    body {
      margin: 0;
      overflow: hidden;
      background: #222;
      font-family: Arial, sans-serif;
    }
    canvas {
      display: block;
    }
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
  width: 50,
  height: 25,
  speed: 5
};

let keys = {};

// Controles
document.addEventListener("keydown", e => keys[e.key] = true);
document.addEventListener("keyup", e => keys[e.key] = false);

// Entrar/sair do carro
document.addEventListener("keydown", e => {
  if (e.key.toLowerCase() === "e") {
    let dist = Math.hypot(player.x - car.x, player.y - car.y);
    if (dist < 60) {
      player.inCar = !player.inCar;
    }
  }
});

// Atualização
function update() {
  if (player.inCar) {
    if (keys["ArrowUp"]) car.y -= car.speed;
    if (keys["ArrowDown"]) car.y += car.speed;
    if (keys["ArrowLeft"]) car.x -= car.speed;
    if (keys["ArrowRight"]) car.x += car.speed;

    player.x = car.x;
    player.y = car.y;
  } else {
    if (keys["ArrowUp"]) player.y -= player.speed;
    if (keys["ArrowDown"]) player.y += player.speed;
    if (keys["ArrowLeft"]) player.x -= player.speed;
    if (keys["ArrowRight"]) player.x += player.speed;
  }
}

// Desenho
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Fundo
  ctx.fillStyle = "#3a3a3a";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Ruas simples
  ctx.fillStyle = "#555";
  ctx.fillRect(100, 0, 80, canvas.height);
  ctx.fillRect(0, 200, canvas.width, 80);

  // Carro
  ctx.fillStyle = "red";
  ctx.fillRect(car.x, car.y, car.width, car.height);

  // Player
  if (!player.inCar) {
    ctx.fillStyle = "white";
    ctx.fillRect(player.x, player.y, player.size, player.size);
  }

  // HUD
  ctx.fillStyle = "white";
  ctx.fillText("Setas: mover | E: entrar/sair do carro", 20, 30);
}

// Loop
function loop() {
  update();
  draw();
  requestAnimationFrame(loop);
}

loop();

// Ajustar tela
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
</script>

</body>
</html>
