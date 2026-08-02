import { useState } from 'react';
import { insertArtist } from '../../api/artist-data-access';

import { Form, Button, Col, Row } from 'react-bootstrap';

// This is a modified version of the ArtistForm component
// It just removes the navigation from the form back to the ArtistList

const ArtistFormAlbumModalAdd = ({ onArtistAdded, sendArt, sendArtId }) => { 
  const [artistName, setArtistName] = useState("");
  const [validated, setValidated] = useState(false);

  const handleArtistSubmit = async (evt) => {
    evt.preventDefault();
    setValidated(true);
      if (artistName) {
      const newArtist = { name: artistName };
      insertArtist(newArtist)
        .then((a) => {
          sendArt(a.name);
          sendArtId(String(a.id)); 
          onArtistAdded(); 
          setArtistName("");
        })
        .catch((error) => {
          console.error("Error adding artist:", error);
        });
    }
  }

  return (           
    <div>
      <h3 className="text-center pb-3">Add New Artist</h3>
      <div onSubmit={handleArtistSubmit}>
        <div className="px-4">
          <div className="d-flex justify-content-center mb-3">
            <Form.Group
              as={Row}
              controlId="artistName"
              className="w-100"
            >
              <Form.Label column sm={3} className="text-end">
                Name:
              </Form.Label>
              <Col sm={9}>
                <Form.Control
                  type="text"
                  value={artistName}
                  placeholder="Artist Name"
                  onChange={(evt) => {
                    setArtistName(evt.target.value);
                    if (validated) setValidated(false);
                  }}
                  isInvalid={validated && !artistName.trim()}
                />
                {validated && !artistName.trim() && (
                  <Form.Control.Feedback type="invalid" className="d-block">
                    Please enter an artist name.
                  </Form.Control.Feedback>
                )}
              </Col>
            </Form.Group>
          </div>

					<div className="d-flex justify-content-center mt-3">
            <Button variant="outline-dark" onClick={handleArtistSubmit} style={{ width: "8rem" }}>
              Add
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtistFormAlbumModalAdd;