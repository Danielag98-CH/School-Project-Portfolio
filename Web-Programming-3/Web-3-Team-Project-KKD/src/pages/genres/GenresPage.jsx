import { Outlet, Route, Routes } from 'react-router-dom';
import MainLayout from '../MainLayout';
import GenreList from './GenreList';
import GenreDetails from './GenreDetails';
import GenreForm from './GenreForm';
import { useDocTitle } from '../../hooks/DocTitle';

const GenresPage = () => {
  useDocTitle("Genres");
  
  return (
    <MainLayout>
      <h1 id="page-heading" style={{ marginTop: "1rem", marginLeft: "3rem", textShadow: "3px 3px 4px gray"}}>Genres</h1>
      
      <div role="main" aria-labelledby="page-heading">
      <Routes>
        <Route index element={<GenreList />} />
        <Route index path=":genreId" element={<GenreDetails />} />
        <Route index path="edit/:genreId" element={<GenreForm />} />
        <Route index path="add/" element={<GenreForm />} />
        <Route index path="remove/" element={<GenreForm />} />
      </Routes>
      <Outlet />
      </div>
    </MainLayout>
  )
}

export default GenresPage;