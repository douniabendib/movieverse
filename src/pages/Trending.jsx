import { useState, useEffect } from 'react';
import { getTrending, searchMovies } from '../services/tmdb';
import MovieCard from '../components/MovieCard';
import useDebounce from '../hooks/useDebounce';

function Trending() {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const debouncedQuery = useDebounce(query, 400);

  useEffect(() => {
    setLoading(true);
    setError(null);

    const request = debouncedQuery.trim()
      ? searchMovies(debouncedQuery)
      : getTrending();

    request
      .then(setMovies)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [debouncedQuery]);

  return (
    <div>
      <h1>{debouncedQuery.trim() ? 'Résultats' : 'Trending'}</h1>

      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Rechercher un film..."
      />

      {loading && <p>Chargement...</p>}
      {error && <p>Erreur : {error}</p>}
      {!loading && !error && movies.length === 0 && (
        <p>Aucun résultat pour « {debouncedQuery} ».</p>
      )}

      <div>
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}

export default Trending;