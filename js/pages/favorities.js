// Función para mostrar las películas favoritas en la página de favoritos
async function mostrarPeliculasFavoritas() {
  try {
    const favoritos = obtenerFavoritos();
    const contenedorPeliculasFavoritas = document.getElementById('contenedorPeliculasFavoritas');
  
    if (favoritos.length === 0) {
      const mensajeElement = document.createElement('p');
      mensajeElement.classList.add("warning-message")
      mensajeElement.textContent = 'No tiene películas seleccionadas en sus favoritos';
      contenedorPeliculasFavoritas.appendChild(mensajeElement);
    } else {
      for (let i = 0; i < favoritos.length; i++) {
        const peliculaId = favoritos[i];
        const pelicula = await obtenerPelicula(peliculaId);
  
        if (pelicula) {
          const peliculaElement = crearPeliculaElement(pelicula);
          contenedorPeliculasFavoritas.appendChild(peliculaElement);
        } else {
          mostrarMensajeError('Hubo un error al cargar la información de las películas favoritas');
          break;
        }
      }
    } } catch (error) {
        mostrarMensajeError('Se produjo un error al obtener las películas de la API');
   
    }

  }
  
  // Función para obtener el detalle de una película desde la API
  async function obtenerPelicula(id) {
    try {
      const apiKey = '3c71e85be68317d81472cba1e7eaa20b';
      const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=es-MX`;
      const response = await fetch(url);
      const data = await response.json();
      return data;
    } catch (error) {
      mostrarMensajeError('Se produjo un error al obtener las películas de la API');
    }
  }
  
  // Función para crear el elemento de película en la página
  function crearPeliculaElement(pelicula) {
    const { poster_path, title, id, original_title, original_language, overview } = pelicula;
  
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
    infoElement.classList.add("parrafo-pelicula")
    infoElement.innerHTML = `<b>Código:</b> ${id}<br>
      <b>Título original:</b> ${original_title}<br>
      <b>Idioma original:</b> ${original_language}<br>
      <b>Resumen:</b> ${overview}<br>`;
    peliculaElement.appendChild(infoElement);
  
    const botonQuitarElement = document.createElement('button');
    botonQuitarElement.classList.add('button', 'medium', 'radius');
    botonQuitarElement.textContent = 'Quitar de favoritos';
    botonQuitarElement.addEventListener('click', function () {
      quitarPeliculaFavorita(id);
      peliculaElement.remove();
    });
    peliculaElement.appendChild(botonQuitarElement);
  
    return peliculaElement;
  }

  
  // Función para quitar una película de la lista de favoritos
  async function quitarPeliculaFavorita(id) {
    const favoritos = await obtenerFavoritos();
    const indice = favoritos.indexOf(id.toString());
    if (indice !== -1) {
      favoritos.splice(indice, 1);
      guardarFavoritos(favoritos);
      mostrarMensajeExito('Película eliminada de favoritos');
      
      
    }
  }
mostrarPeliculasFavoritas();