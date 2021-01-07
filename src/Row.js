import { useState, useEffect } from 'react';
import axios from './axios';

export default function Row(props) {
  const { title, fetchUrl } = props;

  const [movies, setMovies] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl)
      console.log(request)
      return request
    }
    fetchData();
  }, []);


  return (
    <div>
      <h2>{title}</h2>
      {/**container -> posters */}
      {/**title */}
    </div>
  )
}