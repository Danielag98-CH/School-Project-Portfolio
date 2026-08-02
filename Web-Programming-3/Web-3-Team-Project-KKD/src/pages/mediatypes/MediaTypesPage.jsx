import { Outlet, Route, Routes } from 'react-router-dom';
import MainLayout from '../MainLayout';
import MediaTypesList from './MediaTypesList';
import MediaTypesDetails from './MediaTypesDetails';
import MediaTypeForm from './MediaTypeForm';
import { useDocTitle } from '../../hooks/DocTitle';

const MediaTypesPage = () => {
  useDocTitle("Media Types");

  return (
    <MainLayout>
        <h1 id="page-heading" style={{ marginTop: "1rem", marginLeft: "3rem", textShadow: "3px 3px 4px gray"}}>MediaTypes</h1>
        
        <div role="main" aria-labelledby="page-heading">
        <Routes>
          <Route index element={<MediaTypesList />} />
          <Route path=":mediaTypeId" element={<MediaTypesDetails />} />
          <Route path="edit/:mediaTypesId" element={<MediaTypeForm />} />
          <Route path="add/" element={<MediaTypeForm/>} />
      </Routes>
      <Outlet />

      </div>
    </MainLayout>
  )
}

export default MediaTypesPage;