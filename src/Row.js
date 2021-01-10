import { useState, useEffect } from 'react';
import YouTube from 'react-youtube';
import axios from './axios';
import './Row.css';

const base_url ='https://image.tmdb.org/t/p/original/';
const REACT_APP_TMDB_API_KEY = process.env.REACT_APP_TMDB_API_KEY;

export default function Row(props) {
  const { title, fetchUrl, isLargeRow, isMovie } = props;

  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");
  const [failedTrailer, setFailedTrailer] = useState(false);
  const [rowEntryName, setRowEntryName] = useState("");

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

  const requestMovieTrailer = (id) => {
    const movieTrailerRequestUrl = `/movie/${id}/videos?api_key=${REACT_APP_TMDB_API_KEY}&append_to_response=videos`
    async function fetchData() {
      const request = await axios.get(movieTrailerRequestUrl)
      return request
    }
    return fetchData();
  };

  const requestTvTrailer = (id) => {
    const tvTrailerRequestUrl = `/tv/${id}/videos?api_key=${REACT_APP_TMDB_API_KEY}&append_to_response=videos`
    async function fetchData() {
      const request = await axios.get(tvTrailerRequestUrl)
      return request
    }
    return fetchData();
  };

  const handleClick = (movie) => {
    if (trailerUrl) {
      setTrailerUrl('');
      setFailedTrailer(false);
    } else {
      console.log('id:', movie)
      if (isMovie) {
        requestMovieTrailer(movie?.id || "")
        .then(payload => {
          if (payload.data.results[0]) {
            const youtubeKey = payload.data.results[0].key
            setTrailerUrl(youtubeKey)
          } else {
            setFailedTrailer(true);
            setRowEntryName(movie.title)
          }
        })
        .catch(err => console.log(err));
      } else {
        requestTvTrailer(movie?.id || "")
          .then(payload => {
            if (payload.data.results[0]) {
              const youtubeKey = payload.data.results[0].key
              setTrailerUrl(youtubeKey)
            } else {
              setFailedTrailer(true);
              setRowEntryName(movie.title)
            }
          })
          .catch(err => console.log(err));
      }
      /*movieTrailer(`${movie?.id}` || "")
      .then((url) => {
        const urlParams = new URLSearchParams(new URL(url).search);
        setTrailerUrl(urlParams.get('v'));
      })
      .catch((err) => console.log(err.message));*/
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
      {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} /> }
      {failedTrailer && <h2>Error: Failed to find trailer for "{rowEntryName}"</h2>}
    </div>
  )
}