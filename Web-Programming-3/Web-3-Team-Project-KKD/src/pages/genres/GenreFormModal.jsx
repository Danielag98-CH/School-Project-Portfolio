import { useState } from 'react';
import { insertGenre} from '../../api/genre-data-access';

import { Form, Button, Col, Row } from 'react-bootstrap';

// This is a modified version of the GenreForm component
// It just removes the navigation from the form back to the GenreList

const GenreFormModal = ({ onGenreAdded, sendGenre, sendGenreId }) => { 
  const [genreName, setGenreName] = useState("");
  const [validated, setValidated] = useState(false);


  const handleSubmit = async (evt) => {
    evt.preventDefault();
    setValidated(true);
    if (genreName) {
      const newGenre = { name: genreName };
      insertGenre(newGenre)
        .then((g) => {
          sendGenre(g.name);
          sendGenreId(g.id);
          setGenreName("");
          onGenreAdded();
        })
        .catch((error) => {
          console.error("Error adding genre:", error);
        });
    }
  }

  return (
    <>
      <h3 id="genre-form-heading">Add New Genre</h3>
      <Form onSubmit={handleSubmit} role="form" aria-labelledby="genre-form-heading">
				<div className="px-4">
					<div className="d-flex justify-content-center mb-3">
            <Form.Group
              as={Row}
              controlId="genreName"
              className="w-100"
            >
              <Form.Label htmlFor="genreNameInput" column sm={3} className="text-end">
                Name:
              </Form.Label>
              <Col sm={9}>
                <Form.Control
                  type="text"
                  value={genreName}
                  placeholder="Genre Name"
                  onChange={(evt) => {
                    setGenreName(evt.target.value);
                    if (validated) setValidated(false);
                  }}
                  isInvalid={validated && !genreName.trim()}
                  aria-required="true"
                  aria-invalid={validated && !genreName.trim()}
                  aria-describedby="genreNameFeedback"
                />
                {validated && !genreName.trim() && (
                  <Form.Control.Feedback id="genreNameFeedback" type="invalid" className="d-block">
                    Please enter a genre name.
                  </Form.Control.Feedback>
                )}
              </Col>
            </Form.Group>
          </div>
					<div className="d-flex justify-content-center mt-3">
            <Button variant="outline-dark" type="submit" style={{ width: "8rem" }}  aria-label="Add new genre">
              Add
            </Button>
          </div>
        </div>
      </Form>
    </>
  );
};

export default GenreFormModal;