// Función para agregar películas a favoritos según el código de la película
async function agregarPeliculaPorCodigo() {
  const movieCodeInput = document.getElementById('movie-code');
  const movieCode = movieCodeInput.value.trim();


  if (!isNaN(movieCode) && movieCode !== '') {
    const favoritos = obtenerFavoritos();
    if (favoritos.includes(movieCode)) {
      mostrarMensajeAdvertencia('La película ingresada ya se encuentra almacenada');
    } else {

      try {
        const peliculas = await obtenerApi();
        const pelicula = peliculas.find((pelicula) => pelicula.id === Number(movieCode));

        if (pelicula) {
          favoritos.push(movieCode);
          guardarFavoritos(favoritos);
          mostrarMensajeExito('Película agregada con éxito');
        } else {
          mostrarMensajeError('La película seleccionada no se encuentra en la API o se produjo un error al consultar');
        }
      } catch (error) {
        mostrarMensajeError('Se produjo un error al obtener las películas de la API');
      }

    }
  } else {
    mostrarMensajeError('El código de la película debe ser numérico');
  }

  movieCodeInput.value = '';

}



// Evento de submit del formulario para agregar una película por código
const formMovie = document.getElementById('form-movie-new');
formMovie.addEventListener('submit', function (event) {
  event.preventDefault();
  agregarPeliculaPorCodigo();
});

// Función para mostrar las películas en la página
async function mostrarPeliculas() {
  try {
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
  } catch (error) {
    mostrarMensajeError('Se produjo un error al obtener las películas de la API');
  }
}

mostrarPeliculas();
