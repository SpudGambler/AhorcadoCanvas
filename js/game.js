const contador = 0;
let palabra;
let msg;
let encontradas;
let numeroIntentos;

function iniciarJuego() {
  botonVerificar(false);
  botonIngreso(true);
  let palabra = document.getElementById("palabra").value;
  elegirPalabra(palabra);
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
    casillas.appendChild(input);
  }
}

function verificar() {
  let casillas = document.getElementsByClassName("casillitas");
  let alguno = false;
  for (let i = 0; i < msg.length; i++) {
    if (msg[i] == casillas[i].value && encontradas[i] != msg[i]) {
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

function ahorcado() {
  if (numeroIntentos == 5) {
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
  botonReiniciar(true);
  botonIngreso(false);
  let casillas = document.getElementsByClassName("casillitas");
  let n = casillas.length;
  for (let i = 0; i < n; i++) {
    document.querySelector(".casillas").removeChild(casillas[0]);
  }
  document.getElementById("mensajeFinal0").innerText = "";
  numeroIntentos = 0;
  document.getElementById("intentos").innerText =
    "Numero de intentos: " + numeroIntentos;
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
    }
  }
}
