import { useState } from 'react';
import { insertMediaTypes } from '../../api/mediatype-data-access';

import { Form, Button, Col, Row } from 'react-bootstrap';

// This is a modified version of the MediaTypesForm component
// It just removes the navigation from the form back to the MediaTypesList

const MediaTypesFormModal = ({ onMediaTypeAdded, sendMediaType, sendMediaTypeId }) => { 
  const [mediaTypeName, setMediaTypeName] = useState("");
  const [validated, setValidated] = useState(false);

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    setValidated(true);
    if (mediaTypeName) {
      const newMediaType = { name: mediaTypeName };
      insertMediaTypes(newMediaType)
        .then((m) => {
          sendMediaType(m.name);
          sendMediaTypeId(m.id);
          setMediaTypeName("");
          onMediaTypeAdded();
        })
        .catch((error) => {
          console.error("Error adding media types:", error);
        });
    }
  }

  return (
    <>
      <h3 id="media-type-form-heading" className="text-center pb-3">Add New Media Type</h3>
      <Form onSubmit={handleSubmit} role="form" aria-labelledby="media-type-form-heading">
        <div className="px-4">
					<div className="d-flex justify-content-center mb-3">
            <Form.Group
              as={Row}
              className="w-100"
              style={{ justifyContent: "center", alignItems: "center" }}
            >
              <Form.Label htmlFor="mediaTypeNameInput" column sm={3} className="text-end">
                Name:
              </Form.Label>
              <Col sm={9}>
                <Form.Control
                  id="mediaTypeNameInput"
                  type="text"
                  value={mediaTypeName}
                  placeholder="Media Type Name"
                  onChange={(evt) => {
                    setMediaTypeName(evt.target.value);
                    if (validated) setValidated(false);
                  }}
                  isInvalid={validated && !mediaTypeName.trim()}
                  aria-required="true"
                  aria-invalid={validated && !mediaTypeName.trim()}
                  aria-describedby="mediaTypeFeedback"
                />
                {validated && !mediaTypeName.trim() && (
                  <Form.Control.Feedback id="mediaTypeFeedback" type="invalid" className="d-block">
                    Please provide a media type name.
                  </Form.Control.Feedback>
                )}
              </Col>
            </Form.Group>
          </div>

					<div className="d-flex justify-content-center mt-3">
            <Button variant="outline-dark" type="submit" style={{ width: "8rem" }} aria-label="Add new media type">
              Add
            </Button>
          </div>
        </div>
      </Form>
    </>
  );
};

export default MediaTypesFormModal;