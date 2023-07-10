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
    peliculaElement.appendChild(botonFavoritosElement);

    contenedorPeliculas.appendChild(peliculaElement);
  }
}


async function agregarPeliculaFavorita() {
  const codigoPeliculaInput = document.getElementById('movie-code');
  const codigoPelicula = parseInt(codigoPeliculaInput.value);

  // Validación: verificar que se haya ingresado un número válido
  if (isNaN(codigoPelicula)) {
    mostrarMensajeError("Error: Debes ingresar un valor numérico válido");
    return;
  }

  // Obtener las películas favoritas almacenadas en el local storage
  let peliculasFavoritas = localStorage.getItem('FAVORITOS');
  peliculasFavoritas = peliculasFavoritas ? JSON.parse(peliculasFavoritas) : [];

  // Validación: verificar que la película no haya sido ingresada previamente
  if (peliculasFavoritas.includes(codigoPelicula)) {
    mostrarMensajeAdvertencia("La película ingresada ya se encuentra almacenada");
    return;
  }

  // Obtener la información de la película desde la API
  const apiKey = '3c71e85be68317d81472cba1e7eaa20b';
  const url = `https://api.themoviedb.org/3/movie/${codigoPelicula}?api_key=${apiKey}&language=es-MX`;
  
  try {
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      const pelicula = {
        codigo: codigoPelicula,
        titulo: data.title,
        poster: data.poster_path,
        originalTitulo: data.original_title,
        originalIdioma: data.original_language,
        anio: data.release_date
      };
      
      // Agregar la película a la lista de favoritos
      peliculasFavoritas.push(pelicula);
      localStorage.setItem('FAVORITOS', JSON.stringify(peliculasFavoritas));
      
      mostrarMensajeExito("Película agregada con éxito");
    } else {
      mostrarMensajeError("Error: La película seleccionada no se encuentra en la API o se produjo un error al consultar");
    }
  } catch (error) {
    mostrarMensajeError("Error: Ocurrió un problema al consultar la API");
  }
  
  // Limpiar el campo de entrada
  codigoPeliculaInput.value = '';
}

function mostrarMensajeExito(mensaje) {
  const mensajesSection = document.getElementById('sec-messages');
  mensajesSection.innerHTML = `<p class="success-message">${mensaje}</p>`;
}

function mostrarMensajeError(mensaje) {
  const mensajesSection = document.getElementById('sec-messages');
  mensajesSection.innerHTML = `<p class="error-message">${mensaje}</p>`;
}

function mostrarMensajeAdvertencia(mensaje) {
  const mensajesSection = document.getElementById('sec-messages');
  mensajesSection.innerHTML = `<p class="warning-message">${mensaje}</p>`;
}




mostrarPeliculas();