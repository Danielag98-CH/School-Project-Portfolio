import { Card, Button, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function PageCard({title, text, link, linkTitle, icon}) {
  return (
    <Col>
      <Card className='mx-auto text-center' style={{backgroundColor: 'rgba(255, 253, 253, 0.7)'}}>
        <Card.Body className='d-flex flex-column align-items-center justify-content-center text-center'>
          <div className="mb-2" style={{ fontSize: '4rem' }}>
            {icon}
          </div>
          <Card.Title>{title}</Card.Title>
          <Card.Text>
            {text}
          </Card.Text>
          <div className='mt-auto'>  
            <Button 
              variant="warning" 
              className="btn btn-primary btn-outline-dark btn-sm" 
              as={Link} 
              to={link}>
                {linkTitle}
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
}

export default PageCard;