import {Routes, Route} from 'react-router-dom';

import HomePage from './pages/HomePage';
import ArtistsPage from './pages/artists/ArtistsPage';
import AlbumsPage from './pages/albums/AlbumsPage';
import GenresPage from './pages/genres/GenresPage';
import TracksPage from './pages/tracks/TracksPage';
import MediaTypesPage from './pages/mediatypes/MediaTypesPage';
import './app.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage/>} />
      <Route path="/albums/*" element={<AlbumsPage/>} />
      <Route path="/artists/*" element={<ArtistsPage/>} />
      <Route path="/genres/*" element={<GenresPage/>} />
      <Route path="/mediatypes/*" element={<MediaTypesPage/>} />
      <Route path="/tracks/*" element={<TracksPage/>} />
    </Routes>
  );
}

export default App;