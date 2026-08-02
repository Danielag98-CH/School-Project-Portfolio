import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getGenreById, updateGenre, insertGenre } from '../../api/genre-data-access';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

const GenreForm = () => {
  
  const params = useParams();
  const genreId = params.genreId ?? 0;
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [validated, setValidated] = useState(false);

  useEffect(() => {
    if(genreId > 0){
      getGenreById(genreId)
        .then(genre => {
          setName(genre.name);
        })
    }
  }, []);
  
  function handleSubmit(evt){
    evt.preventDefault();
    const form = evt.currentTarget;
    if(form.checkValidity() === false || genreId === ""){
      evt.stopPropagation();
      setValidated(true);
      return;
    }else{
      if(name){
        const artistObj = {name};
        if(genreId > 0) {
          artistObj.id = genreId;
          updateGenre(artistObj).then(() => navigate("/genres"));
        }else{
          insertGenre(artistObj).then(() => navigate("/genres"));
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
    <Form noValidate validated={validated} onSubmit={handleSubmit} role="form"  aria-labelledby="genre-form-heading">
      <div style={ isMobile ? smallScreen : notSmallScreen }>
        <div style={{padding: "1rem"}} >  
          <Form.Group as={Col} style={{ display: "flex", justifyContent: "center", alignItems: "center", marginBottom: "1rem" }}>
            <Form.Label htmlFor="genreNameInput" style={{ width: '140px', textAlign: "right" }}>Name:&nbsp;</Form.Label>
            <Form.Control
              id="genreNameInput"
              required
              type="text"
              value={name}
              placeholder="Enter genre name:"
              onChange={(evt)=> setName(evt.target.value)}
              style={{  width: '200px'}}
              aria-required="true"
              aria-invalid={validated && !name}
              aria-describedby="genreNameFeedback"
            />
            {validated && !name && (
              <Form.Control.Feedback id="genreNameFeedback" type="invalid" className="d-block text-red" style={{  width: '200px'}}>
                &nbsp;Please provide a genre name.
              </Form.Control.Feedback>
            )}
          </Form.Group>
          <div className="align-items-center" style={{ display: "flex", justifyContent: "center", marginTop: "1rem" }}>
            <Button type="submit" aria-label="Save genre">Save Genre</Button>
          </div>
        </div>  
      </div>  
    </Form>
  );
}


export default GenreForm;