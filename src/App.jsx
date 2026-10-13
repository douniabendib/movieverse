import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Trending from './pages/Trending';
import MovieDetails from './pages/MovieDetails';
import Favorites from './pages/Favorites';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Trending />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
        <Route path="/favorites" element={<Favorites />} />
      </Routes>
      <footer>Données fournies par TMDB.</footer>
    </>
  );
}

export default App;