async function obtenerApi() {
  const apiKey = '3c71e85be68317d81472cba1e7eaa20b';
  const url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=es-MX&page=1`;
  const response = await fetch(url);
  const data = await response.json();
  return data.results;
}

// Función para obtener el array de favoritos del local storage
function obtenerFavoritos() {
  const favoritos = localStorage.getItem('FAVORITOS');
  return favoritos ? JSON.parse(favoritos) : [];
}

// Función para guardar el array de favoritos en el local storage
function guardarFavoritos(favoritos) {
  localStorage.setItem('FAVORITOS', JSON.stringify(favoritos));
}

// Función para mostrar un mensaje de éxito en la sección de mensajes
function mostrarMensajeExito(mensaje) {
  const mensajesSection = document.getElementById('sec-messages');
  mensajesSection.innerHTML = `<p class="success-message">${mensaje}</p>`;
  
  setTimeout(function() {
    mensajesSection.innerHTML = "";
  }, 10000)
}

// Función para mostrar un mensaje de error en la sección de mensajes
function mostrarMensajeError(mensaje) {
  const mensajesSection = document.getElementById('sec-messages');
  mensajesSection.innerHTML = `<p class="error-message">${mensaje}</p>`;

  setTimeout(function() {
    mensajesSection.innerHTML = "";
  }, 10000)
}

// Función para mostrar un mensaje de advertencia en la sección de mensajes
function mostrarMensajeAdvertencia(mensaje) {
  const mensajesSection = document.getElementById('sec-messages');
  mensajesSection.innerHTML = `<p class="warning-message">${mensaje}</p>`;
  setTimeout(function() {
    mensajesSection.innerHTML = "";
  }, 10000)
}