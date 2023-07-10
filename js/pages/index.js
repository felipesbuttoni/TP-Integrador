// Función para agregar películas a favoritos según el código de la película
function agregarPeliculaPorCodigo() {
  const movieCodeInput = document.getElementById('movie-code');
  const movieCode = movieCodeInput.value.trim();

  if (!isNaN(movieCode) && movieCode !== '') {
    const favoritos = obtenerFavoritos();
    if (favoritos.includes(movieCode)) {
      mostrarMensajeAdvertencia('La película ingresada ya se encuentra almacenada');
    } else {
      const peliculas = obtenerApi();
      const pelicula = peliculas.find((pelicula) => pelicula.id === Number(movieCode));

      if (pelicula) {
        favoritos.push(movieCode);
        guardarFavoritos(favoritos);
        mostrarMensajeExito('Película agregada con éxito');
      } else {
        mostrarMensajeError('La película seleccionada no se encuentra en la API o se produjo un error al consultar');
      }
    }
  } else {
    mostrarMensajeError('El código de la película debe ser numérico');
  }

  movieCodeInput.value = '';
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
}

// Función para mostrar un mensaje de error en la sección de mensajes
function mostrarMensajeError(mensaje) {
  const mensajesSection = document.getElementById('sec-messages');
  mensajesSection.innerHTML = `<p class="error-message">${mensaje}</p>`;
}

// Función para mostrar un mensaje de advertencia en la sección de mensajes
function mostrarMensajeAdvertencia(mensaje) {
  const mensajesSection = document.getElementById('sec-messages');
  mensajesSection.innerHTML = `<p class="warning-message">${mensaje}</p>`;
}

// Evento de submit del formulario para agregar una película por código
const formMovie = document.getElementById('form-movie-new');
formMovie.addEventListener('submit', function (event) {
  event.preventDefault();
  agregarPeliculaPorCodigo();
});

// Función para mostrar las películas en la página
async function mostrarPeliculas() {
  const peliculas = await obtenerApi();
  const contenedorPeliculas = document.getElementById('contenedorPeliculas');

  for (let i = 0; i < peliculas.length; i++) {
    const { poster_path, title, id, original_title, original_language, release_date } = peliculas[i];

    const peliculaElement = document.createElement('div');
    peliculaElement.classList.add('pelicula');

    const imagenElement = document.createElement('img');
    imagenElement.classList.add('poster');
    imagenElement.src = `https://image.tmdb.org/t/p/w500/${poster_path}`;
    peliculaElement.appendChild(imagenElement);

    const tituloElement = document.createElement('h3');
    tituloElement.classList.add('titulo');
    tituloElement.textContent = title;
    peliculaElement.appendChild(tituloElement);

    const infoElement = document.createElement('p');
    infoElement.innerHTML = `<b>Código:</b> ${id}<br>
      <b>Título original:</b> ${original_title}<br>
      <b>Idioma original:</b> ${original_language}<br>
      <b>Año:</b> ${release_date}<br>`;
    peliculaElement.appendChild(infoElement);

    const botonFavoritosElement = document.createElement('button');
    botonFavoritosElement.classList.add('button', 'medium', 'radius');
    botonFavoritosElement.textContent = 'Agregar a favoritos';
    botonFavoritosElement.addEventListener('click', function () {
      const favoritos = obtenerFavoritos();
      if (favoritos.includes(id.toString())) {
        mostrarMensajeAdvertencia('La película ingresada ya se encuentra almacenada');
      } else {
        favoritos.push(id.toString());
        guardarFavoritos(favoritos);
        mostrarMensajeExito('Película agregada con éxito');
      }
    });
    peliculaElement.appendChild(botonFavoritosElement);

    contenedorPeliculas.appendChild(peliculaElement);
  }
}

mostrarPeliculas();
