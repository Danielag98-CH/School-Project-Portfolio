import { Outlet, Route, Routes } from 'react-router-dom';
import MainLayout from '../MainLayout';
import AlbumList from './AlbumList';
import AlbumDetails from './AlbumDetails';
import AlbumForm from './AlbumForm';
import { useDocTitle } from '../../hooks/DocTitle';

const AlbumsPage = () => {
  useDocTitle("Albums");

  return (
    <MainLayout>
      <h1 id="page-heading" style={{ marginTop: "1rem", marginLeft: "3rem", textShadow: "3px 3px 4px gray"}}>Albums</h1>
        
      <div role="main" aria-labelledby="page-heading">
      <Routes>
          <Route index element={<AlbumList/>} />
          <Route path=":albumId" element={<AlbumDetails/>} />
          <Route path="edit/:albumId" element={<AlbumForm/>} />
          <Route path="add/" element={<AlbumForm/>} />
      </Routes>
      <Outlet />
      </div>
    </MainLayout>
  )
}

export default AlbumsPage;