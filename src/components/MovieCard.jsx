import { Link } from 'react-router-dom';

const IMG_URL = 'https://image.tmdb.org/t/p/w500';

function MovieCard({ movie }) {
  return (
    <Link className="movie-card" to={`/movie/${movie.id}`}>
      <img
        src={movie.poster_path ? `${IMG_URL}${movie.poster_path}` : ''}
        alt={movie.title}
      />
      <h3>{movie.title}</h3>
      <p>Note : {movie.vote_average.toFixed(1)}</p>
      <p>Sortie : {movie.release_date}</p>
    </Link>
  );
}

export default MovieCard;