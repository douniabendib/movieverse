const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

export async function getTrending() {
  const res = await fetch(`${BASE_URL}/trending/movie/week?api_key=${API_KEY}`);

  if (!res.ok) {
    throw new Error('Impossible de charger les films');
  }

  const data = await res.json();
  return data.results;
}

export async function getMovieDetails(id) {
  const res = await fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}`);

  if (!res.ok) {
    throw new Error('Film introuvable');
  }

  return res.json();
}

export async function searchMovies(query) {
  const res = await fetch(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`
  );

  if (!res.ok) {
    throw new Error('Recherche impossible');
  }

  const data = await res.json();
  return data.results;
}

export async function discoverMovies({ year, sortBy }) {
  const params = new URLSearchParams({
    api_key: API_KEY,
    sort_by: sortBy,
    'vote_count.gte': 100,
  });
  if (year) params.set('primary_release_year', year);

  const res = await fetch(`${BASE_URL}/discover/movie?${params}`);

  if (!res.ok) {
    throw new Error('Impossible de charger les films');
  }

  const data = await res.json();
  return data.results;
}