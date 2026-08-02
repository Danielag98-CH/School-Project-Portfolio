import { useState } from 'react';
import { insertArtist } from '../../api/artist-data-access';

import { Form, Button, Col, Row } from 'react-bootstrap';

// This is a modified version of the ArtistForm component
// It just removes the navigation from the form back to the ArtistList

const ArtistFormModal = ({ onArtistAdded, sendArt, sendArtId }) => { 
  const [artistName, setArtistName] = useState("");
  const [validated, setValidated] = useState(false);

  const handleArtistSubmit = async (evt) => {
    evt.preventDefault();
    setValidated(true);
    if (!artistName.trim()) {
      return; // stop submit, show validation error
    }
    
    const newArtist = { name: artistName.trim() };
    try {
      const a = await insertArtist(newArtist);
      sendArt(a.name);
      sendArtId(String(a.id));
      setArtistName("");
      setValidated(false);  // reset validation on success
      onArtistAdded();
    } catch (error) {
      console.error("Error adding artist:", error);
    }
  };

  return (
    <>
      <h3 id="add-artist-heading" className="text-center pb-3">Add New Artist</h3>
      <Form onSubmit={handleArtistSubmit}role="form" aria-labelledby="add-artist-heading">
        <div className="px-4">
					<div className="d-flex justify-content-center mb-3">
            <Form.Group
              as={Row}
              className="w-100"
            >
              <Form.Label htmlFor="artistNameInput" column sm={3} className="text-end">
                Name:
              </Form.Label>
              <Col sm={9}>
                <Form.Control
                  id="artistNameInput"
                  type="text"
                  value={artistName}
                  placeholder="Artist Name"
                  onChange={(evt) => {
                    setArtistName(evt.target.value);
                    if (validated) setValidated(false);
                  }}
                  isInvalid={validated && !artistName.trim()}
                  aria-required="true"
                  aria-invalid={validated && !artistName.trim()}
                  aria-describedby="artistNameFeedback"
                />
                {validated && !artistName.trim() && (
                  <Form.Control.Feedback  id="artistNameFeedback" type="invalid" className="d-block">
                    Please provide an artist name.
                  </Form.Control.Feedback>
                )}
              </Col>
            </Form.Group>
          </div>
					
          <div className="d-flex justify-content-center mt-3">
            <Button variant="outline-dark" type="submit" style={{ width: "8rem" }} aria-label="Add new artist">
              Add
            </Button>

          </div>
        </div>
      </Form>
    </>
  );
};

export default ArtistFormModal;