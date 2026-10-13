import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieDetails } from '../services/tmdb';
import useFavorites from '../hooks/useFavorites';

const IMG_URL = 'https://image.tmdb.org/t/p/w500';

function MovieDetails() {
  const { id } = useParams();
  const { isFavorite, toggleFavorite } = useFavorites();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getMovieDetails(id)
      .then(setMovie)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>Erreur : {error}</p>;

  return (
    <div className="details">
      <img
        src={movie.poster_path ? `${IMG_URL}${movie.poster_path}` : ''}
        alt={movie.title}
      />
      <h1>{movie.title}</h1>
      <p>{movie.overview}</p>
      <p>Genres : {movie.genres.map((g) => g.name).join(', ')}</p>
      <p>Durée : {movie.runtime} min</p>
      <p>Note : {movie.vote_average.toFixed(1)}</p>
      <button onClick={() => toggleFavorite(movie)}>
        {isFavorite(movie.id) ? 'Retirer des favoris' : 'Ajouter aux favoris'}
      </button>
    </div>
  );
}

export default MovieDetails;