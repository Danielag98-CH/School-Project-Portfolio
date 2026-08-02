import { useEffect, useState } from 'react';
import { insertAlbum } from '../../api/album-data-access';
import { getAllArtists } from '../../api/artist-data-access';
import Dropdown from '../../components/Dropdown'
import ArtistFormAlbumModalAdd from '../artists/ArtistFormAlbumModalAdd';
import styles from './AlbumFormModal.module.css';
import { Form, Button, Col, Row } from 'react-bootstrap';

// This is a modified version of the AlbumForm component for TracksForm
// This changes the form to be a div so it can be nested in TracksForm

const AlbumFormTrackModalAdd = ({ onAlbumAdded, sendAlbum, sendAlbumId }) => {

    const [albumTitle, setAlbumTitle] = useState("");
    const [artistId, setArtistId] = useState("");
    const [artist, setArtist] = useState(""); 

    // State for drop down artist list
    const [artists, setArtists] = useState([]);
    // State for refresh
    const [refreshArtists, setRefreshArtists] = useState(false);
    // State to control visibility of the ArtistFormModal (now a div instead of a form)
    const [showArtistForm, setShowArtistForm] = useState(false);
    // State for validation
    const [validated, setValidated] = useState(false);

    // Defining function to get and set artists
    function fetchArtists(){getAllArtists().then(setArtists)}

    // Trigers render of artists
    useEffect(() => {fetchArtists()}, [refreshArtists]);

    // Map through all of the artists for the dropdown
    const artistOptions = [
        { value: "(Add New Artist)", text: "(Add New Artist)" },
        ...artists.map(artist => ({ value: String(artist.id), text: artist.name })),
    ];

    // Function to handle form submission
    const handleAlbumSubmit = async (evt) => {
        evt.preventDefault();
        setValidated(true);
        if (albumTitle && artistId) {
            const albumObj = { title: albumTitle, artistId: Number(artistId), artist: artist.name };
            insertAlbum(albumObj)
                .then((createdAlbum) => {
                    sendAlbum(createdAlbum.title);
                    sendAlbumId(String(createdAlbum.id));
                    if (onAlbumAdded) {
                        onAlbumAdded(createdAlbum);
                    }
                    setAlbumTitle("");
                    setArtistId("");
                    setArtist("");
                })
                .catch((error) => {
                    console.error("Error adding album:", error);
                });
        }else {
            console.log("Album Title and Artist selection are required!");
        }
    }

    // Handles the nested artist 'form'
    const handleArtistFormClose = () => {
        setShowArtistForm(false);
        // Changing this will force a re-render
        setRefreshArtists(prev => !prev);
    };

    // Sets the artist from child
    const handleSetArtist = (artistName) => {
        setArtist(artistName);
    }

    // Sets the artistId from child
    const handleSetArtistId = (artistId) => {
      setArtistId(artistId);
    }

    return (
			<div>
				<h3 id="album-form-heading" className="text-center pb-3">Add New Album</h3>
				<Form onSubmit={handleAlbumSubmit} role="form" aria-labelledby="album-form-heading">
					<div className="px-4">
						<div className="d-flex justify-content-center mb-3">
							<Form.Group as={Row} className="w-100">
								<Form.Label htmlFor="albumTitleInput" column sm={3} className="text-end">
									Title:
								</Form.Label>
								<Col sm={9}>
									<Form.Control
										id="albumTitleInput"
										type="text"
										value={albumTitle}
										placeholder="Album Title"
										onChange={(evt) => {
											setAlbumTitle(evt.target.value);
											if (validated) setValidated(false);
										}}
										isInvalid={validated && !albumTitle.trim()}
										aria-required="true"
										aria-invalid={validated && !albumTitle.trim()}
										aria-describedby="albumTitleFeedback"
									/>
									{validated && !albumTitle.trim() && (
										<Form.Control.Feedback type="invalid" className="d-block">
											Please provide an album title.
										</Form.Control.Feedback>
									)}
								</Col>
							</Form.Group>
						</div>
					<div className="d-flex justify-content-center mb-3">
						<Form.Group as={Row} controlId="validationArtist" className="w-100">
							<Form.Label htmlFor="artistDropdown" column sm={3} className="text-end">
								Artist:
							</Form.Label>
							<Col sm={9}>
								<div
									id="artistDropdown"
									aria-required="true"
									aria-invalid={validated && !artistId}
									aria-describedby="artistFeedback"
								>
								<Dropdown
									options={artistOptions}
									selectedValue={artistId}
									onOptionSelected={(value) => {
										setArtistId(value);
										if (value === "(Add New Artist)") {
											setShowArtistForm(true);
										} else {
											const selectedArtist = artists.find(artist => artist.id === Number(value));
											if (selectedArtist) {
												setArtist(selectedArtist.name);
											}
										}
									}}
									createNew="Artist"
								/>
								</div>
								{validated && !artistId && (
									<Form.Control.Feedback id="artistFeedback" type="invalid" className="d-block text-danger">
										Please select an artist.
									</Form.Control.Feedback>
								)}
							</Col>
						</Form.Group>
      		</div>
					{/* Using conditional rendering to show/hide the ArtistFormModal */} 
					{/* Doing this because it does not like nested forms in forms */} 
					{/* Also nested routes for some reason render even though the div is supposed to be hidden */}
					{showArtistForm && (
						<>
							<div className={styles.artistFormContainer}>
								<ArtistFormAlbumModalAdd
									onArtistAdded={handleArtistFormClose}
									sendArt={handleSetArtist}
									sendArtId={handleSetArtistId}
								/>
							</div>
							<div className="d-flex justify-content-center mt-3">
								<button
									type="button"
									className="btn btn-light btn-outline-dark btn-md"
									style={{ width: "12rem" }}
									onClick={() => setShowArtistForm(prev => !prev)}
								>
									Hide Add New Artist
								</button>
							</div>
						</>
					)}

					<div className="d-flex justify-content-center mt-3">
						<Button variant="outline-dark" type="submit" style={{ width: "8rem" }}>
							Add
						</Button>
					</div>
				</div>
			</Form>
		</div>
	)
};

export default AlbumFormTrackModalAdd;