let palabra;
let msg;
let encontradas;
let numeroIntentos;
let c;
canvas();

function iniciarJuego() {
  let palabra = document.getElementById("palabra").value;
  if (palabra != "") {
    document.getElementById("palabra").disabled = true;
    document.getElementById("palabra").value = "";
    elegirPalabra(palabra);
    botonVerificar(false);
    botonIngreso(true);
    numeroIntentos = 0;
    document.getElementById("intentos").innerText =
      "Numero de intentos: " + numeroIntentos;
  } else {
    alert("No se ingresó una palabra correcta");
  }
}

function botonIngreso(valor) {
  document.getElementById("btninicio").hidden = valor;
  document.getElementById("btninicio").disabled = valor;
}

function botonVerificar(valor) {
  document.getElementById("btnverificacion").hidden = valor;
  document.getElementById("btnverificacion").disabled = valor;
}

function botonReiniciar(valor) {
  document.getElementById("btnreinicio").hidden = valor;
  document.getElementById("btnreinicio").disabled = valor;
}

function elegirPalabra(palabra) {
  msg = new String(palabra);
  encontradas = [msg.length];
  for (let i = 0; i < msg.length; i++) {
    encontradas[i] = "";
  }
  crearCasillas(msg);
}

function crearCasillas(arr) {
  for (let i = 0; i < arr.length; i++) {
    const casillas = document.querySelector(".casillas");
    var input = document.createElement("input");
    input.type = "text";
    input.id = i;
    input.className = "casillitas"; // set the CSS class
    if (arr[i] == " ") {
      input.disabled = true;
      encontradas[i] = " ";
    }
    casillas.appendChild(input);
  }
}

function verificar() {
  let casillas = document.getElementsByClassName("casillitas");
  let alguno = false;
  for (let i = 0; i < msg.length; i++) {
    if (similitud(msg[i], casillas[i].value) && encontradas[i] != msg[i]) {
      encontradas[i] = msg[i];
      document.getElementById(i).disabled = true;
      alguno = true;
    }
  }
  limpiarCasillas();
  if (alguno == false) {
    numeroIntentos++;
    document.getElementById("intentos").innerText =
      "Numero de intentos: " + numeroIntentos;
    ahorcado();
  } else {
    ganador();
  }
}

function similitud(wordR, wordC) {
  return (
    wordR == wordC ||
    wordR == wordC.toUpperCase() ||
    wordR == wordC.toLowerCase()
  );
}

function ahorcado() {
  agregarParte();
  if (numeroIntentos == 6) {
    document.getElementById("mensajeFinal0").innerText = "Ahorcado";
    mostrarFaltantes();
    botonVerificar(true);
    botonReiniciar(false);
  }
}

function ganador() {
  let simil = 0;
  for (let i = 0; i < msg.length; i++) {
    if (msg[i] == encontradas[i]) {
      simil++;
    }
  }
  if (simil == msg.length) {
    document.getElementById("mensajeFinal0").innerText = "Ganador";
    botonVerificar(true);
    botonReiniciar(false);
  }
}

function reiniciar() {
  document.getElementById("palabra").disabled = false;
  document.getElementById("palabra").value = "";
  botonReiniciar(true);
  botonIngreso(false);
  let casillas = document.getElementsByClassName("casillitas");
  let n = casillas.length;
  for (let i = 0; i < n; i++) {
    document.querySelector(".casillas").removeChild(casillas[0]);
  }
  document.getElementById("mensajeFinal0").innerText = "";
  document.getElementById("intentos").innerText = "";
  reiniciarCanvas();
}

function limpiarCasillas() {
  let casillas = document.getElementsByClassName("casillitas");
  for (let i = 0; i < msg.length; i++) {
    if (encontradas[i] != msg[i]) {
      casillas[i].value = "";
    }
  }
}

function mostrarFaltantes() {
  let casillas = document.getElementsByClassName("casillitas");
  for (let i = 0; i < msg.length; i++) {
    if (encontradas[i] != msg[i]) {
      casillas[i].value = msg[i];
      casillas[i].style.color = "red";
      casillas[i].disabled = true;
    }
  }
}

function agregarParte() {
  switch (numeroIntentos) {
    case 1:
      drawCircle();
      break;
    case 2:
      drawPalo();
      break;
    case 3:
      drawBrazoDerecho();
      break;
    case 4:
      drawBrazoIzquierdo();
      break;
    case 5:
      drawPiernaDerecha();
      break;
    case 6:
      drawPiernaIzquierda();
      break;
    default:
      break;
  }
}

function canvas() {
  c = document.getElementById("canvas");
  c.width = window.innerWidth;
  c.height = window.innerHeight;
  dibujarFondo();
}

function dibujarFondo() {
  var ctx = c.getContext("2d");
  ctx.lineWidth = 50;
  ctx.beginPath();
  ctx.moveTo(window.innerWidth / 4, window.innerHeight / 10 - 5);
  ctx.lineTo(window.innerWidth / 4, window.innerHeight - 20);
  ctx.moveTo(window.innerWidth / 4 - 200, window.innerHeight - 20);
  ctx.lineTo(window.innerWidth / 4 + 200, window.innerHeight - 20);
  ctx.moveTo(window.innerWidth / 4 - 25, window.innerHeight / 5 - 90);
  ctx.lineTo(window.innerWidth / 4 + 330, window.innerHeight / 5 - 90);
  ctx.moveTo(window.innerWidth / 4 - 10, window.innerHeight / 4 + 50);
  ctx.lineTo(window.innerWidth / 4 + 200, window.innerHeight / 5 - 90);
  ctx.stroke();
  ctx.lineWidth = 10;
  ctx.moveTo(window.innerWidth / 2 - 5, window.innerHeight / 10 - 5);
  ctx.lineTo(window.innerWidth / 2 - 5, window.innerHeight / 10 + 10);
  ctx.stroke();
}

function drawCircle() {
  var ctx = c.getContext("2d");
  ctx.beginPath();
  ctx.arc(
    window.innerWidth / 2,
    window.innerHeight / 2 - 180,
    60,
    0,
    (Math.PI / 180) * 360,
    false
  );
  ctx.stroke();
  borderColor(ctx);
}

function drawPalo() {
  var ctx = c.getContext("2d");
  ctx.beginPath();
  ctx.moveTo(window.innerWidth / 2, window.innerHeight / 2 - 120);
  ctx.lineTo(window.innerWidth / 2, window.innerHeight / 2 + 80);
  ctx.stroke();
  borderColor(ctx);
}

function drawBrazoDerecho() {
  var ctx = c.getContext("2d");
  ctx.beginPath();
  ctx.moveTo(window.innerWidth / 2, window.innerHeight / 2 - 90);
  ctx.lineTo(window.innerWidth / 2 + 100, window.innerHeight / 2);
  ctx.stroke();
  borderColor(ctx);
}

function drawBrazoIzquierdo() {
  var ctx = c.getContext("2d");
  ctx.beginPath();
  ctx.moveTo(window.innerWidth / 2, window.innerHeight / 2 - 90);
  ctx.lineTo(window.innerWidth / 2 - 100, window.innerHeight / 2);
  ctx.stroke();
  borderColor(ctx);
}

function drawPiernaDerecha() {
  var ctx = c.getContext("2d");
  ctx.beginPath();
  ctx.moveTo(window.innerWidth / 2, window.innerHeight / 2 + 75);
  ctx.lineTo(window.innerWidth / 2 + 75, window.innerHeight / 2 + 250);
  ctx.stroke();
  borderColor(ctx);
}

function drawPiernaIzquierda() {
  var ctx = c.getContext("2d");
  ctx.beginPath();
  ctx.moveTo(window.innerWidth / 2, window.innerHeight / 2 + 75);
  ctx.lineTo(window.innerWidth / 2 - 75, window.innerHeight / 2 + 250);
  ctx.stroke();
  borderColor(ctx);
}

function borderColor(c) {
  screen.strokeStyle = "#f00";
  c.lineWidth = 10;
  c.stroke();
}

function reiniciarCanvas() {
  var ctx = c.getContext("2d");
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
  dibujarFondo();
}
