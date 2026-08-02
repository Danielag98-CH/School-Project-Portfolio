import { useEffect, useState } from 'react';
import { Route, Routes, useNavigate, useParams } from 'react-router-dom';
import { getAlbumById, insertAlbum, updateAlbum } from '../../api/album-data-access';
import { getAllArtists } from '../../api/artist-data-access';
import Dropdown from '../../components/Dropdown';
import Modal from '../../components/Modal';
import ArtistFormModal from '../artists/ArtistFormModal';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

const AlbumForm = () => {

  const params = useParams();
  const albumId = params.albumId ? Number(params.albumId) : 0;
  const navigate = useNavigate();

  // Defining State title
  const [title, setTitle] = useState("");
  // Defining State artistId
  const [artistId, setArtistId] = useState("");
  // Defining State single artist for edit/modal
  const [artist, setArtist] = useState("");
  // Defining State for ALL artists
  // This is used for the dropdown
  const [artists, setArtists] = useState([]);
  // Defining State for refresh of artists for dropdown
  const [refreshArtists, setRefreshArtists] = useState(false); 
  // Defining State for modal
  const [showModal, setShowModal] = useState(false);
  // Defining Function to get and set artists
  function fetchArtists(){getAllArtists().then(setArtists)}
  // Defining validation state
  const [validated, setValidated] = useState(false);

  // Trigers render of artists
  useEffect(() => {fetchArtists()}, [refreshArtists]);

  // Grab existing album information
  useEffect(()=>{
    if(albumId > 0){
      getAlbumById(albumId).then((album)=>{
        setTitle(album.title);
        setArtistId(album.artistId);
        setArtist(album.artist); 
      });
    }
  }, [albumId]);

  // Map through all of the artists for the dropdown
  const artistOptions = [
    { value: "(Add New Artist)", text: "(Add New Artist)" },
    ...artists.map(artist => ({ value: artist.id, text: artist.name })),
  ];

  // Function to handle modal close
  // Refresh artists for the dropdown on close
  const handleModalClose = () => {
    setShowModal(false);
    setRefreshArtists(prev => !prev); 
  };

  // Set the artist from child
  const handleSetArtist = (artist) => {
      setArtist(artist);
  }

  // Set the artistId from child
  const handleSetArtistId = (artistId) => {
      setArtistId(artistId);
  }

  // Function to handle form submission
  const handleSubmit = (evt) => {
    evt.preventDefault();
    const form = evt.currentTarget;
    if(form.checkValidity() === false || artistId === ""){
      evt.stopPropagation();
      setValidated(true);
      return;
    }else{
      if(title){
        if(albumId > 0) {
          const album = {id: albumId, title, artistId: Number(artistId), artist};
          updateAlbum(album).then(() => navigate("/albums"));
        }else{
          const album = {title: title, artistId: Number(artistId), artist};
          insertAlbum(album).then(() => navigate("/albums"));
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
    <>
      <Form noValidate validated={validated} onSubmit={handleSubmit} role="form" aria-labelledby="album-form-heading">
        <div style={ isMobile ? smallScreen : notSmallScreen }>
          <div style={{padding: "1rem"}} >            
            <Form.Group as={Col} style={{ display: "flex", justifyContent: "center", alignItems: "center", marginBottom: "1rem" }}>
              <Form.Label htmlFor="albumTitle" style={{ width: '140px', textAlign: "right" }}>Title:&nbsp;</Form.Label>
              <Form.Control style={{  width: '200px'}}
                id="albumTitle"
                name="albumTitle"
                required
                type="text"
                value={title}
                placeholder="Enter album title:"
                onChange={(evt)=> setTitle(evt.target.value)}
                aria-required="true"
                aria-invalid={validated && !title}
                aria-describedby="albumTitleFeedback"
              />
              {validated && !title && (
                <Form.Control.Feedback id="albumTitleFeedback" type="invalid" className="d-block text-red" style={{  width: '200px'}}>
                    &nbsp;Please provide an album title.
                </Form.Control.Feedback>
              )}
            </Form.Group>
            <Form.Group as={Col} style={{ display: "flex", justifyContent: "center", alignItems: "center", marginBottom: "1rem" }}>
              <Form.Label htmlFor="artistSelect" style={{ width: '140px', textAlign: "right" }}>Artist:&nbsp;</Form.Label>
              <div id="artistSelect" className={validated && !artistId ? "is-invalid" : ""} style={{  width: '200px'}}  aria-required="true"
                  aria-invalid={validated && !artistId}
                  aria-describedby="artistFeedback">
                <Dropdown
                  options={artistOptions}
                  onOptionSelected={(value) => {
                    setArtistId(value);
                    if(value === "(Add New Artist)"){
                      setShowModal(true);
                    }else{
                      const selectedArtist = artists.find(artist => artist.id === Number(value));
                      if (selectedArtist) {
                        setArtist(selectedArtist.name);
                      }
                    }
                  }}
                  selectedValue={artistId}
                  createNew="Artist" />
              </div>
              {validated && !artistId && (
                <Form.Control.Feedback id="artistFeedback" type="invalid" className="d-block text-red" style={{  width: '200px'}}>
                  &nbsp; Please select an artist.
                </Form.Control.Feedback>
              )}
            </Form.Group>
            <div className="align-items-center" style={{ display: "flex", justifyContent: "center", marginTop: "1rem" }}>
              <Button className="btn btn-primary" type="submit">Save Album</Button>
            </div>
          </div>
        </div>
      </Form>
      <Modal
        show={showModal}
        onClose={handleModalClose}> 
        <Routes>
          <Route index element={<ArtistFormModal 
            onArtistAdded={handleModalClose} 
            sendArt={handleSetArtist} 
            sendArtId={handleSetArtistId} />} />
        </Routes>
      </Modal>
    </>
    )
}
export default AlbumForm;