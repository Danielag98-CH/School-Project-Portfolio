import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getArtistById, updateArtist, insertArtist } from '../../api/artist-data-access';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

const ArtistForm = () => {
  
  const params = useParams();
  const artistId = params.artistId ?? 0;
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [validated, setValidated] = useState(false);

  useEffect(() => {
    if(artistId > 0){
      getArtistById(artistId)
        .then(artist => {
          setName(artist.name);
        })
    }
  }, []);
  
  function handleSubmit(evt){
    evt.preventDefault();
    const form = evt.currentTarget;
    if(form.checkValidity() === false || artistId === ""){
      evt.stopPropagation();
      setValidated(true);
      return;
    }else{
      if(name){
        const artistObj = {name};
        if(artistId > 0) {
          artistObj.id = artistId;
          updateArtist(artistObj).then(() => navigate("/artists"));
        }else{
          insertArtist(artistObj).then(() => navigate("/artists"));
        }
      }
    }
    setValidated(true);
  }

  // CSS since inline block is causing the CSS to break
  // Microsoft Copilot assisted with this function

  function useIsMobile(breakpoint = 600) {
    const [isMobile, setIsMobile] = useState(window.innerWidth <= breakpoint);

    useEffect(() => {
      const handleResize = () => setIsMobile(window.innerWidth <= breakpoint);
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, [breakpoint]);

    return isMobile;
  }

  const smallScreen = {
    backgroundColor: 'rgba(255,255,255,0.7)',
    // marginLeft: '0',
    marginLeft: 'auto',
    marginRight: 'auto',
    display: 'block',
    borderRadius: '10px',
  }

  const notSmallScreen = {
    backgroundColor: 'rgba(255,255,255,0.7)',
    maxWidth: '600px',
    display: 'inline-block',
    marginLeft: '1rem',
    borderRadius: '10px'
  }
  
  const isMobile = useIsMobile();
 
  return (
    <Form noValidate validated={validated} onSubmit={handleSubmit} role="form" aria-labelledby="artist-form-heading" >
      <div style={ isMobile ? smallScreen : notSmallScreen }>
        <div style={{padding: "1rem"}} >
          <Form.Group as={Col} style={{ display: "flex", justifyContent: "center", alignItems: "center", marginBottom: "1rem" }}>
            <Form.Label htmlFor="artistNameInput" style={{ width: '140px', textAlign: "right" }}>Name:&nbsp;</Form.Label>
            <Form.Control
              id="artistNameInput"
              required
              type="text"
              value={name}
              placeholder="Enter artist name:"
              onChange={(evt)=> setName(evt.target.value)}
              style={{  width: '200px'}}
              aria-required="true"
              aria-invalid={validated && !name}
              aria-describedby="artistNameFeedback"
            />
            {validated && !name && (
              <Form.Control.Feedback id="artistNameFeedback" type="invalid" className="d-block text-red" style={{  width: '200px'}}>
                &nbsp;Please provide an artist name.
              </Form.Control.Feedback>
            )}
          </Form.Group>
          <div className="align-items-center" style={{ display: "flex", justifyContent: "center", marginTop: "1rem" }}>
            <Button type="submit" aria-label="Save artist">Save Artist</Button>
          </div>
        </div>  
      </div>  
    </Form>
  );
}


export default ArtistForm;