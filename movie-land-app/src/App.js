import { useState, useEffect } from 'react';
import MovieCard from './MovieCard';
import searchIcon from './search.svg';
import './App.css';

const API_URL = 'http://www.omdbapi.com/?i=tt3896198&apikey=36e2a321';

const App = () => {
  const [searchTerm, setSearchTerm] = useState();
  const [movies, setMovies] = useState([]);

  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();
    setMovies(data.Search);
  }

  useEffect(() => {
    searchMovies('spiderman');
  }, [])


  return (
    <div className="App">
      <h1>MovieLand</h1>
      <div className='search'>
        <input placeholder='Search for movies' value={searchTerm} onChange={(e) => { setSearchTerm(e.target.value) }} />
        <img src={searchIcon} alt="search" onClick={() => searchMovies(searchTerm)} />
      </div>
      {movies?.length > 0
        ? (
          <div className="container">
            {movies.map((movie) => (
              <MovieCard movie={movie} />
            ))}
          </div>
        ) : (<div className='empty'>
          <h2>No movies Found</h2>
        </div>)
      }
    </div>
  );
}

export default App;
