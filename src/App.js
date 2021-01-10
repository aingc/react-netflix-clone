import './App.css';
import Row from './Row';
import requests from './requests';
import Banner from './Banner';
import Nav from './Nav';

function App() {
  return (
    <div className="app">
      <Nav />
      <Banner />
      <Row
        title="NETFLIX ORIGINALS"
        fetchUrl={requests.fetchNetflixOriginals}
        isLargeRow
        />
      <Row
        title="Trending Now"
        fetchUrl={requests.fetchTrending}
        isMovie
        />
      <Row
        title="Top Rated"
        fetchUrl={requests.fetchTopRated}
        isMovie
      />
      <Row
        title="Action Movies"
        fetchUrl={requests.fetchActionMovies}
        isMovie
        />
      <Row
        title="Comedy Movies"
        fetchUrl={requests.fetchComedyMovies}
        isMovie
        />
      <Row
        title="Horror Movies"
        fetchUrl={requests.fetchHorrorMovies}
        isMovie
        />
      <Row
        title="Romance Movies"
        fetchUrl={requests.fetchRomanceMovies}
        isMovie
        />
      <Row
        title="Documentaries"
        fetchUrl={requests.fetchDocumentaries}
        isMovie
        />
    </div>
  );
}

export default App;
