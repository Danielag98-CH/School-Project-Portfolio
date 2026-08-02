import { Outlet, Route, Routes } from 'react-router-dom';
import MainLayout from '../MainLayout';
import TrackList from './TrackList';
import TrackDetails from './TrackDetails';
import TrackForm from './TrackForm';
import { useDocTitle } from '../../hooks/DocTitle';

const TracksPage = () => {
  useDocTitle("Tracks");

  return (
    <MainLayout>
      <h1 id="page-heading" style={{ marginTop: "1rem", marginLeft: "3rem", textShadow: "3px 3px 4px gray"}}>Tracks</h1>
      <div role="main" aria-labelledby="page-heading">
      <Routes>
        <Route index element={<TrackList />} />
        <Route path=":trackId" element={<TrackDetails />} />
        <Route path="edit/:trackId" element={<TrackForm />} />
        <Route path="add/" element={<TrackForm />} />
        <Route path="remove/" element={<TrackForm />} />
      </Routes>
      <Outlet />
      </div>
    </MainLayout>
  )
}

export default TracksPage;