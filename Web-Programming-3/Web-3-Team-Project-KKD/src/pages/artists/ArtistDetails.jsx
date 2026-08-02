import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getArtistById } from '../../api/artist-data-access';
import ArtistDetailsTable from '../../components/ArtistsDetailsTable';

const ArtistDetails = () => {
  const params = useParams();
  const artistId = params.artistId ?? null;

  const [artist, setArtist] = useState({id:0, name:""});

  useEffect(() => {
    if(artistId){
      getArtistById(artistId)
        .then(artist => setArtist(artist))
        .catch(err => {
          console.error("Error fetching artist details:", err);
        });
    }
  }, [artistId]);

  return (
    <>
      <ArtistDetailsTable artist={ artist } />
    </>
  )
}

export default ArtistDetails;