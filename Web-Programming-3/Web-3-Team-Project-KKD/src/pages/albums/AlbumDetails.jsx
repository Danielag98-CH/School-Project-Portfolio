import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getAlbumById } from '../../api/album-data-access';
import AlbumDetailsTable from '../../components/AlbumDetailsTable';

const AlbumDetails = () => {
  
  const params = useParams();
  const albumId = params.albumId ?? null;

  const [album, setAlbum] = useState({id:0, title:"", artistId: 0, artist: ""}); 

  useEffect(()=>{
    if(albumId){
      getAlbumById(albumId).then(album => setAlbum(album));
    }
  }, [albumId]);

  return (
    <>
      {/* <h2>{album.title}</h2> */}
      {/* <p>The id used for this album is: <b>{album.id}</b></p>
      <p>Artist: <b>{album.artist}</b></p> */}
      <AlbumDetailsTable album={ album } />
    </>
  )
}

export default AlbumDetails;