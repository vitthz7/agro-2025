//chatgpt
let trator, obstaculos = [], powerUps = [], pontos = 0, vTrator = 5, jogoAtivo = true;

function setup() {
  createCanvas(800, 600);
  textAlign(CENTER, CENTER);
  trator = { x: width / 2, y: height - 60, w: 40, h: 60 };
  textSize(40);
}

function draw() {
  background(135, 206, 235);
  fill(34, 139, 34); rect(0, 0, 100, height); rect(width - 100, 0, 100, height);
  fill(50); rect(100, 0, width - 200, height);
  stroke(255); strokeWeight(4);
  for (let i = 0; i < height; i += 40) line(width / 2, i, width / 2, i + 20);
  noStroke();

  if (!jogoAtivo) {
    fill(255, 0, 0);
    textSize(50);
    text("GAME OVER", width / 2, height / 2);
    textSize(24);
    text("Pontos: " + pontos, width / 2, height / 2 + 60);
    return;
  }

  // Mostrar trator 🚜
  textSize(40);
  text("🚜", trator.x + trator.w / 2, trator.y + trator.h / 2);
  if (keyIsDown(LEFT_ARROW) && trator.x > 100) trator.x -= vTrator;
  if (keyIsDown(RIGHT_ARROW) && trator.x < width - 100 - trator.w) trator.x += vTrator;

  // Obstáculos 💣
  textSize(30);
  for (let i = obstaculos.length - 1; i >= 0; i--) {
    let o = obstaculos[i];
    o.y += 4;
    text("💣", o.x, o.y);
    if (dist(o.x, o.y, trator.x + trator.w / 2, trator.y + trator.h / 2) < 30) {
      jogoAtivo = false; // bateu no obstáculo -> game over
    } else if (o.y > height) obstaculos.splice(i, 1);
  }

  // Power-ups ⛽️ (gasolina)
  for (let i = powerUps.length - 1; i >= 0; i--) {
    let p = powerUps[i];
    p.y += 3;
    text("⛽️", p.x, p.y);
    if (dist(p.x, p.y, trator.x + trator.w / 2, trator.y + trator.h / 2) < 30) {
      pontos += 50; // ganha 50 pontos pegando gasolina
      powerUps.splice(i, 1);
    } else if (p.y > height) powerUps.splice(i, 1);
  }

  // Gerar obstáculos e power-ups
  if (frameCount % 120 === 0) obstaculos.push({ x: random(120, width - 120), y: -30 });
  if (frameCount % 300 === 0) powerUps.push({ x: random(120, width - 120), y: -30 });

  // Pontos contínuos
  if (frameCount % 60 === 0) pontos++;

  // Mostrar pontos
  fill(255);
  textSize(24);
  stroke(0);
  strokeWeight(2);
  text('Pontos: ' + pontos, 20, 30);
}
