import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getGenreById } from '../../api/genre-data-access';
import GenreDetailsTable from '../../components/GenreDetailsTable';

const GenreDetails = () => {
  
  const params = useParams();
  const genreId = params.genreId ?? null;

  const [genre, setGenre] = useState({id:0, name:""}); 

  useEffect(()=>{
    if(genreId){
      getGenreById(genreId)
      .then(genre => setGenre(genre));
    }
  }, [genreId]);

  return (
    <>
      <GenreDetailsTable genre={ genre } />
    </>
  )
}

export default GenreDetails;