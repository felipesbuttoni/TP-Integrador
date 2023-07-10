async function obtenerApi() {
  const apiKey = '3c71e85be68317d81472cba1e7eaa20b';
  const url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=es-MX&page=1`;
  const response = await fetch(url);
  const data = await response.json();
  return data.results;
}
