
import { useState, useEffect } from 'react';
import { getTrackById, updateTrack, insertTrack } from '../../api/track-data-access';
import { Route, Routes, useNavigate, useParams } from 'react-router-dom';
import Dropdown from '../../components/Dropdown';
import Modal from '../../components/Modal'; 
import AlbumFormTrackModalAdd from '../albums/AlbumFormTrackModalAdd'; 
import GenreFormModal from '../genres/GenreFormModal';
import MediaTypesFormModal from '../mediatypes/MediaTypesFormModal';
import { getAllAlbums } from '../../api/album-data-access';
import { getAllGenres } from '../../api/genre-data-access';
import { getAllMediaTypes } from '../../api/mediatype-data-access';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

const TrackForm = () => {
  
  const params = useParams();
  const currentTrackId = params.trackId ?? 0;
  const navigate = useNavigate();

  // Defining State variables
  const [name, setName] = useState("");
  const [albumId, setAlbumId] = useState("");
  const [album, setAlbum] = useState("");
  const [genreId, setGenreId] = useState("");
  const [genre, setGenre] = useState("");
  const [mediaTypeId, setMediaTypeId] = useState("");
  const [mediaType, setMediaType] = useState("");
  const [milliseconds, setMilliseconds] = useState("");
  const [price, setPrice] = useState("");
  const [validated, setValidated] = useState(false);

  // Defining State for drop down lists
  const [albums, setAlbums] = useState([]);
  const [genres, setGenres] = useState([]);
  const [mediaTypes, setMediaTypes] = useState([]);

  // Defining State for refresh
  const [refreshAlbums, setRefreshAlbums] = useState(false); 
  const [refreshGenres, setRefreshGenres] = useState(false); 
  const [refreshMediaTypes, setRefreshMediaTypes] = useState(false); 

  // Defining Function to get and set albums
  function fetchAlbums(){getAllAlbums().then(setAlbums)}
  // Defining Function to get and set genres
  function fetchGenres(){getAllGenres().then(setGenres)}
  // Defining Function to get and set media types
  function fetchMediaTypes(){getAllMediaTypes().then(setMediaTypes)}
  // Defining State for Album modal
  const [showAlbumModal, setShowAlbumModal] = useState(false);
  // Define State for Genre modal
  const [showGenreModal, setShowGenreModal] = useState(false);
  // Define State for Media Type modal
  const [showMediaTypeModal, setShowMediaTypeModal] = useState(false);
  // Trigers render of Albums
  useEffect(() => {fetchAlbums()}, [refreshAlbums]);
  // Trigers render of Genres
  useEffect(() => {fetchGenres()}, [refreshGenres]);
  // Trigers render of Media Types
  useEffect(() => {fetchMediaTypes()}, [refreshMediaTypes]);

  // Render for edit where id/track exists
  useEffect(() => {
    if(currentTrackId > 0){
      getTrackById(currentTrackId)
        .then(track => {
          setName(track.name);
          setAlbumId(track.albumId);
          setGenreId(track.genreId);
          setMediaTypeId(track.mediaTypeId);
          setMilliseconds(track.milliseconds);
          setPrice(track.price);
        
          // Find and set the display names from the Dropdown lists
          const foundAlbum = albums.find(a => a.id === track.albumId);
          if (foundAlbum) setAlbum(foundAlbum.title);

          const foundGenre = genres.find(g => g.id === track.genreId);
          if (foundGenre) setGenre(foundGenre.name);

          const foundMediaType = mediaTypes.find(m => m.id === track.mediaTypeId);
          if (foundMediaType) setMediaType(foundMediaType.name);
        });
    }
  }, [albums, genres, mediaTypes, currentTrackId]);

  // Map through all of the albums for the Dropdown
  const albumOptions = [
    { value: "(Add New Album)", text: "(Add New Album)" },
    ...albums.map(album => ({ value: album.id, text: album.title })),
  ];

  // Map through all of the genres for the Dropdown
  const genreOptions = [
    { value: "(Add New Genre)", text: "(Add New Genre)" },
    ...genres.map(genre => ({ value: genre.id, text: genre.name })),
  ];

  // Map through all of the media types for the Dropdown
  const mediaTypeOptions = [
    { value: "(Add New Media Type)", text: "(Add New Media Type)" },
    ...mediaTypes.map(m => ({ value: m.id, text: m.name })),
  ];
  
  // Submit Handler
    function handleSubmit(evt){
    evt.preventDefault();
    const form = evt.currentTarget;
    if(form.checkValidity() === false || albumId === "" || genreId === "" || mediaTypeId === "" || isNaN(milliseconds) || isNaN(price) || Number(milliseconds) <= 0 || Number(price) <= 0){
      evt.stopPropagation();
      setValidated(true);
      return;
    }else{
      if(name){
        const trackObj = { 
          name, 
          albumId: Number(albumId), 
          album, 
          genreId: Number(genreId), 
          genre, 
          mediaTypeId: Number(mediaTypeId), 
          mediaType, 
          milliseconds: Number(milliseconds), 
          price: Number(price) 
        };
        if(currentTrackId > 0){
          trackObj.id = currentTrackId;
          updateTrack(trackObj).then(navigate("/tracks"));
        }else{
          insertTrack(trackObj).then(navigate("/tracks"));
        }
      }
    }
    setValidated(true);
  }

  // Function to handle modal close
  // Refreshes albums for the Dropdown on close
  const handleAlbumModalClose = () => {
    setShowAlbumModal(false);
    // Changing this will force a re-render
    setRefreshAlbums(prev => !prev); 
  };

  // Function to handle modal close
  // Refresh genres for the Dropdown on close
  const handleGenreModalClose = () => {
    setShowGenreModal(false);
    // Changing this will force a re-render
    setRefreshGenres(prev => !prev); 
  };

  // Function to handle modal close
  // Refresh artists for the Dropdown on close
  const handleMediaTypeModalClose = () => {
    setShowMediaTypeModal(false);
    // Changing this will force a re-render
    setRefreshMediaTypes(prev => !prev); 
  };

  // Sets the album from child
  const handleSetAlbum = (album) => {
      setAlbum(album);
  }

  // Sets the album id from child
  const handleSetAlbumId = (albumId) => {
      setAlbumId(albumId);
  }

  // Sets the genre from child
  const handleSetGenre = (genre) => {
      setGenre(genre);
  }

  // Sets the genre id from child
  const handleSetGenreId = (genreId) => {
      setGenreId(genreId);
  }

  // Sets the media type from child
  const handleSetMediaType = (mediaType) => {
      setMediaType(mediaType);
  }

  // Sets the media type id from child
  const handleSetMediaTypeId = (mediaTypeId) => {
      setMediaTypeId(mediaTypeId);
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
    marginLeft: '0',
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
      <Form noValidate validated={validated} onSubmit={handleSubmit} role="form" aria-labelledby="track-form-heading">
        <div style={ isMobile ? smallScreen : notSmallScreen } role="region" aria-labelledby="track-form-heading">
          <div style={{padding: "1rem"}} >            
            <Form.Group as={Col} style={{ display: "flex", justifyContent: "center", alignItems: "center", marginBottom: "1rem" }}>
              <Form.Label htmlFor="trackName" style={{ width: '140px', textAlign: "right" }}>Track:&nbsp;</Form.Label>
              <Form.Control id="trackName" 
                style={{  width: '200px'}}
                required
                type="text"
                value={name}
                placeholder="Enter track name:"
                onChange={(evt)=> setName(evt.target.value)}
                aria-required="true"
                aria-label="Track name"
              />
              {validated && !name && (
                <Form.Control.Feedback type="invalid" className="d-block text-red" style={{  width: '200px'}}>
                    &nbsp;Please provide a track name.
                </Form.Control.Feedback>
              )}
            </Form.Group>
            <Form.Group as={Col} style={{ display: "flex", justifyContent: "center", alignItems: "center", marginBottom: "1rem" }}>
              <Form.Label htmlFor="albumDropdown" style={{ width: '140px', textAlign: "right" }}>Album:&nbsp;</Form.Label>
              <div  id="albumDropdown" className={validated && !albumId ? "is-invalid" : ""} style={{  width: '200px'}}>
                 <Dropdown
                  options={albumOptions}
                  onOptionSelected={(value) => {
                    setAlbumId(value);
                    if (value === "(Add New Album)") {
                      setShowAlbumModal(true);
                    }else{
                      const selectedAlbum = albums.find(a => a.id === Number(value));
                      if (selectedAlbum) {
                        setAlbum(selectedAlbum.title);
                      }
                    }
                  }}
                  createNew="Album"
                  selectedValue={albumId}
                  aria-label="Album selection dropdown"/>
              </div>
              {validated && !albumId && (
                <Form.Control.Feedback type="invalid" className="d-block text-red" style={{  width: '200px'}}>
                  &nbsp; Please select an album.
                </Form.Control.Feedback>
              )}
            </Form.Group>
            <Form.Group as={Col} style={{ display: "flex", justifyContent: "center", alignItems: "center", marginBottom: "1rem" }}>
              <Form.Label htmlFor="genreDropdown" style={{ width: '140px', textAlign: "right" }}>Genre:&nbsp;</Form.Label>
              <div id="genreDropdown" className={validated && !genreId ? "is-invalid" : ""} style={{  width: '200px'}}>
                 <Dropdown
                  options={genreOptions}
                  onOptionSelected={(value) => {
                    setGenreId(value);
                    if (value === "(Add New Genre)") {
                      setShowGenreModal(true);
                    }else{
                      const selectedGenre = genres.find(g => g.id === Number(value));
                      if (selectedGenre) {
                        setGenre(selectedGenre.name);
                      }
                    }
                  }}
                  createNew="Genre"
                  selectedValue={genreId}
                  aria-label="Genre selection dropdown" />
              </div>
              {validated && !genreId && (
                <Form.Control.Feedback type="invalid" className="d-block text-red" style={{  width: '200px'}}>
                  &nbsp; Please select a genre.
                </Form.Control.Feedback>
              )}
            </Form.Group>
            <Form.Group as={Col} style={{ display: "flex", justifyContent: "center", alignItems: "center", marginBottom: "1rem" }}>
              <Form.Label htmlFor="mediaTypeDropdown" style={{ width: '140px', textAlign: "right" }}>Media Type:&nbsp;</Form.Label>
              <div  id="mediaTypeDropdown" className={validated && !mediaTypeId ? "is-invalid" : ""} style={{  width: '200px'}}>
                 <Dropdown
                  options={mediaTypeOptions}
                  onOptionSelected={(value) => {
                    setMediaTypeId(value);
                    if (value === "(Add New Media Type)") {
                      setShowMediaTypeModal(true);
                    }else{
                      const selectedMediaType = mediaTypes.find(m => m.id === Number(value));
                      if (selectedMediaType) {
                        setMediaType(selectedMediaType.name);
                      }
                    }
                  }}
                  createNew="Media Type"
                  selectedValue={mediaTypeId}
                  aria-label="Media type selection dropdown" />
              </div>
              {validated && !mediaTypeId && (
                <Form.Control.Feedback type="invalid" className="d-block text-red" style={{  width: '200px'}}>
                  &nbsp; Please select a media type.
                </Form.Control.Feedback>
              )}
            </Form.Group>
            <Form.Group as={Col} style={{ display: "flex", justifyContent: "center", alignItems: "center", marginBottom: "1rem" }}>
              <Form.Label htmlFor="milliseconds" style={{ width: '140px', textAlign: "right" }}>Milliseconds:&nbsp;</Form.Label>
              <Form.Control
                id="milliseconds"
                style={{ width: '200px' }}
                required
                type="number"
                value={milliseconds}
                placeholder="Enter milliseconds:"
                min="1"
                onChange={(evt) => setMilliseconds(evt.target.value)}
                aria-required="true"
              />
              {validated && (!milliseconds || isNaN(milliseconds) || Number(milliseconds) <= 0) && (
                <Form.Control.Feedback type="invalid" className="d-block text-red">
                  &nbsp; Please enter a valid number of milliseconds.
                </Form.Control.Feedback>
              )}
            </Form.Group>
            <Form.Group as={Col} style={{ display: "flex", justifyContent: "center", alignItems: "center", marginBottom: "1rem" }}>
              <Form.Label htmlFor="price" style={{ width: '140px', textAlign: "right" }}>Unit Price:&nbsp;</Form.Label>
              <Form.Control
                id="price" 
                style={{  width: '200px'}}
                required
                value={price}
                type="number"
                min="0.01"
                step="0.01"
                placeholder="Enter unit price:"
                onChange={(evt)=> setPrice(evt.target.value)}
                aria-required="true"
              />
              {validated && (!price || isNaN(price) || Number(price) <= 0.01) && (
                <Form.Control.Feedback type="invalid" className="d-block text-red" style={{width: '200px'}}>
                    &nbsp; Please enter the unit price.
                </Form.Control.Feedback>
              )}
            </Form.Group>
            <div className="align-items-center" style={{ display: "flex", justifyContent: "center", marginTop: "1rem" }}>
              <Button type="submit" className='btn btn-primary btn-md' style={{ width: "8rem" }} aria-label="Save track" >Save Track</Button>
            </div>
          </div>
        </div>
      </Form>
      <Modal
          show={showAlbumModal}
          onClose={handleAlbumModalClose}> 
          <Routes>
            <Route index element={<AlbumFormTrackModalAdd 
              onAlbumAdded={handleAlbumModalClose} 
              sendAlbum={handleSetAlbum}
              sendAlbumId={handleSetAlbumId} />} />
          </Routes>
        </Modal>
        <Modal
          show={showGenreModal}
          onClose={handleGenreModalClose}> 
          <Routes>
            <Route index element={<GenreFormModal 
              onGenreAdded={handleGenreModalClose} 
              sendGenre={handleSetGenre}
              sendGenreId={handleSetGenreId}/>} />
          </Routes>
        </Modal>
        <Modal
          show={showMediaTypeModal}
          onClose={handleMediaTypeModalClose}> 
          <Routes>
            <Route index element={<MediaTypesFormModal 
              onMediaTypeAdded={handleMediaTypeModalClose} 
              sendMediaType={handleSetMediaType}
              sendMediaTypeId={handleSetMediaTypeId}/>} />
          </Routes>
        </Modal>
      </>
  )
}

export default TrackForm;