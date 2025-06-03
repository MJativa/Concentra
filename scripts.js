function mostrarMensaje() {
  alert("Aquí irían los métodos de estudio. Próximamente disponibles.");
}

document.addEventListener("DOMContentLoaded", function () {
  lucide.createIcons();
});

/*CRONOMETRO*/
let temporizador;
let tiempoRestante = 0;

document.querySelectorAll(".cr-time-btn").forEach(boton => {
  boton.addEventListener("click", () => {
    const minutos = parseInt(boton.getAttribute("data-minutos"));
    iniciarCronometro(minutos);
    pantallaCompleta();
  });
});

function iniciarCronometro(minutos) {
  tiempoRestante = minutos * 60;
  actualizarDisplay();

  clearInterval(temporizador);
  temporizador = setInterval(() => {
    tiempoRestante--;
    actualizarDisplay();

    if (tiempoRestante <= 0) {
      clearInterval(temporizador);
      sonidoAlarma.play();
      alert("¡Tiempo terminado! ¡Buen trabajo!");
      sonidoAlarma.pause(); 
      sonidoAlarma.currentTime = 0;
      mostrarBotones();
      salirPantallaCompleta();
    }    
  }, 1000);
}

function actualizarDisplay() {
  const minutos = Math.floor(tiempoRestante / 60);
  const segundos = tiempoRestante % 60;
  document.getElementById("cr-timer").textContent =
    `${minutos.toString().padStart(2, '0')}:${segundos.toString().padStart(2, '0')}`;
}

// Activar pantalla completa
function pantallaCompleta() {
  const elem = document.documentElement;
  if (elem.requestFullscreen) elem.requestFullscreen();
  else if (elem.webkitRequestFullscreen) elem.webkitRequestFullscreen();
  else if (elem.msRequestFullscreen) elem.msRequestFullscreen();
}

// Salir de pantalla completa
function salirPantallaCompleta() {
  if (document.exitFullscreen) document.exitFullscreen();
  else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
  else if (document.msExitFullscreen) document.msExitFullscreen();
}

firebase.auth().onAuthStateChanged(user => {
  const barra = document.getElementById('barra-usuario');

  if (user && barra) {
    const nombre = user.displayName || user.email;
    barra.innerHTML = `
      <div class="nombre-usuario" title="${nombre}">👤 ${nombre}</div>
      <button class="boton-salir" id="cerrarSesion">Cerrar sesión</button>
    `;

    document.getElementById('cerrarSesion').onclick = () => {
      firebase.auth().signOut().then(() => {
        window.location.href = "index.html";
      });
    };
  }
});

