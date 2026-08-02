import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getMediaTypesById, insertMediaTypes, updateMediaTypes } from '../../api/mediatype-data-access';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

const MediaTypeForm = () => {
  
  const params = useParams();
  const mediaTypesId = params.mediaTypesId ?? 0;
  const navigate = useNavigate();
  const [name, setName] = useState("");

    // Defining State for validation
  const [validated, setValidated] = useState(false);

  useEffect(()=>{if(mediaTypesId > 0)
    {getMediaTypesById(mediaTypesId)
    .then((mediaType)=>{
      setName(mediaType.name);
    })}}, [mediaTypesId]);

   const handleSubmit = (evt) => {
    evt.preventDefault();
    const form = evt.currentTarget;
    if(form.checkValidity() === false || mediaTypesId === ""){
      evt.stopPropagation();
      setValidated(true);
      return;
    }else{
      if(name){
        if(mediaTypesId > 0){
          const mediaType = {id: mediaTypesId, name: name};
          updateMediaTypes(mediaType).then(()=>{navigate("/mediaTypes")});
        }else{
          const mediaType = {name: name};
          insertMediaTypes(mediaType).then(()=>{navigate("/mediaTypes")});
        }
      }
    }
    setValidated(true);
  };

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
    marginLeft: '0',
    // marginLeft: 'auto',
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
    <Form noValidate validated={validated} onSubmit={handleSubmit} role="form" aria-labelledby="media-type-form-heading">
      <div style={ isMobile ? smallScreen : notSmallScreen }>
        <div style={{padding: "1rem"}} >  
          <Form.Group as={Col} style={{ display: "flex", justifyContent: "center", alignItems: "center", marginBottom: "1rem" }}>
            <Form.Label htmlFor="mediaTypeInput" style={{ width: '140px', textAlign: "right" }}>Name:&nbsp;</Form.Label>
            <Form.Control
              id="mediaTypeInput"
              required
              type="text"
              value={name}
              placeholder="Enter a media type:"
              onChange={(evt)=> setName(evt.target.value)}
              style={{  width: '200px'}}
              aria-required="true"
              aria-invalid={validated && !name}
              aria-describedby="mediaTypeFeedback"
            />
            {validated && !name && (
              <Form.Control.Feedback id="mediaTypeFeedback" type="invalid" className="d-block text-red" style={{  width: '200px'}}>
                &nbsp;Please enter a media type.
              </Form.Control.Feedback>
            )}
          </Form.Group>
          <div className="align-items-center" style={{ display: "flex", justifyContent: "center", marginTop: "1rem" }}>
            <Button type="submit" aria-label="Save media type">Save Media Type</Button>
          </div>
        </div>  
      </div>  
    </Form>
  )
}

export default MediaTypeForm;