import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMediaTypesById } from '../../api/mediatype-data-access';
import MediaTypesDetailsTable from '../../components/MediaTypesDetailsTable';


const MediaTypesDetails = () => {

    const params = useParams();
    const mediaTypeId = params.mediaTypeId ?? null;

    const [mediaType, setMediaType] = useState({ id: 0, name: "" });

    useEffect(() => {
        if(mediaTypeId){
            
            getMediaTypesById(mediaTypeId)
            .then(mediaType => setMediaType(mediaType))
            
        }
    }, [mediaTypeId])

    return (
        <>
            <MediaTypesDetailsTable mediaType={ mediaType } />
        </>
    )

}

export default MediaTypesDetails;