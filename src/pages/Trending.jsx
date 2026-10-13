import { useState, useEffect } from 'react';
import { getTrending, searchMovies, discoverMovies } from '../services/tmdb';
import MovieCard from '../components/MovieCard';
import useDebounce from '../hooks/useDebounce';

const SORTS = {
  popularity: 'popularity.desc',
  rating: 'vote_average.desc',
  date: 'primary_release_date.desc',
};

function sortList(list, sortBy) {
  const copy = [...list];
  if (sortBy === 'popularity') copy.sort((a, b) => b.popularity - a.popularity);
  if (sortBy === 'rating') copy.sort((a, b) => b.vote_average - a.vote_average);
  if (sortBy === 'date')
    copy.sort((a, b) => (b.release_date || '').localeCompare(a.release_date || ''));
  return copy;
}

function Trending() {
  const [query, setQuery] = useState('');
  const [year, setYear] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const debouncedQuery = useDebounce(query, 400);
  const validYear = /^\d{4}$/.test(year) ? year : '';

  useEffect(() => {
    setLoading(true);
    setError(null);

    let request;
    if (debouncedQuery.trim()) {
      request = searchMovies(debouncedQuery).then((list) => {
        const filtered = validYear
          ? list.filter((m) => (m.release_date || '').startsWith(validYear))
          : list;
        return sortList(filtered, sortBy);
      });
    } else if (validYear || sortBy) {
      request = discoverMovies({
        year: validYear,
        sortBy: SORTS[sortBy] || 'popularity.desc',
      });
    } else {
      request = getTrending();
    }

    request
      .then(setMovies)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [debouncedQuery, validYear, sortBy]);

  return (
    <div>
      <h1>{debouncedQuery.trim() ? 'Résultats' : 'Trending'}</h1>

      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Rechercher un film..."
      />

      <input
        type="text"
        value={year}
        onChange={(e) => setYear(e.target.value)}
        placeholder="Année (ex. 2024)"
        maxLength={4}
      />

      <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
        <option value="">Trier par...</option>
        <option value="popularity">Popularité</option>
        <option value="rating">Note</option>
        <option value="date">Date de sortie</option>
      </select>

      {loading && <p>Chargement...</p>}
      {error && <p>Erreur : {error}</p>}
      {!loading && !error && movies.length === 0 && (
        <p>Aucun résultat.</p>
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