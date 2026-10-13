import useFavorites from '../hooks/useFavorites';
import MovieCard from '../components/MovieCard';

function Favorites() {
  const { favorites, toggleFavorite } = useFavorites();

  if (favorites.length === 0) return <p>Aucun favori pour le moment.</p>;

  return (
    <div>
      <h1>Favoris</h1>
      <div className="movie-grid">
        {favorites.map((movie) => (
          <div key={movie.id}>
            <MovieCard movie={movie} />
            <button onClick={() => toggleFavorite(movie)}>Supprimer</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Favorites;