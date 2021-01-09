import { useState, useEffect } from 'react';
import YouTube from 'react-youtube';
import movieTrailer from 'movie-trailer';
import axios from './axios';
import './Row.css';

const base_url ='https://image.tmdb.org/t/p/original/';

export default function Row(props) {
  const { title, fetchUrl, isLargeRow } = props;

  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");

  //rule of thumb, any var used in useEffect, should be in the dependency array
  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl)
      setMovies(request.data.results)
      return request
    }
    fetchData();
  }, [fetchUrl]);

  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      autoplay: 1
    }
  }

  const handleClick = (movie) => {
    if (trailerUrl) {
      setTrailerUrl('');
    } else {
      movieTrailer(movie?.name || "")
      .then((url) => {
        const urlParams = new URLSearchParams(new URL(url).search);
        setTrailerUrl(urlParams.get('v'));
      })
      .catch((err) => console.log(err));
    }
  }

  return (
    <div className="row">
      <h2>{title}</h2>
      <div className="row__posters">
        {/**serveral row__poster(s) */}
        {movies.map(movie => (
          <img
            key={movie.id}
            onClick={() => handleClick(movie)}
            className={`row__poster ${isLargeRow && "row__posterLarge"}`}
            src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
            alt={movie.title}
            />
        ))}
      </div>
      {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
    </div>
  )
}