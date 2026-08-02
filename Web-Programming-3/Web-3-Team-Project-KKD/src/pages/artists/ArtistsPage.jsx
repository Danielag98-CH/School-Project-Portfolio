import { Routes, Route, Outlet } from 'react-router-dom';
import MainLayout from '../MainLayout';
import ArtistList from './ArtistsList';
import ArtistDetails from './ArtistDetails';
import ArtistForm from './ArtistForm';
import { useDocTitle } from '../../hooks/DocTitle';

const ArtistsPage = () => {
  useDocTitle("Artists");
  
  return (
    <MainLayout>
      <h1 id="page-heading" style={{ marginTop: "1rem", marginLeft: "3rem", textShadow: "3px 3px 4px gray" }}>Artists</h1>
      
      <div role="main" aria-labelledby="page-heading">
      <Routes>
        <Route index element={<ArtistList />} />
        <Route path=":artistId" element={<ArtistDetails />} />
        <Route path="edit/:artistId" element={<ArtistForm />} />
        <Route path="add/" element={<ArtistForm/>} />
      </Routes>

      <Outlet />
      </div>
    </MainLayout>
  )
}

export default ArtistsPage;