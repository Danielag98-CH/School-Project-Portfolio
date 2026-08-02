import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getTrackById } from '../../api/track-data-access';
import TrackDetailsTable from '../../components/TrackDetailsTable';


const TrackDetails = () => {
  
  const params = useParams();
  const trackId = params.trackId ?? null;

  const [track, setTrack] = useState({id:0, name:""}); 

  useEffect(()=>{
    if(trackId){
      getTrackById(trackId).then(track => setTrack(track));
    }
  }, [trackId]);

  return (
    <>
      <TrackDetailsTable track={ track } />
    </>
  )
}

export default TrackDetails;