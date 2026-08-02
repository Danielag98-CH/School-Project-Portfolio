import { Navbar } from "react-bootstrap";

const Footer = () => {
  return (
    <Navbar bg="dark" as="footer"
      style={{color: "white", 
              height: '3rem', 
              display: 'flex', 
              alignItems: 'left', 
              fontSize: '1.4rem',
              marginTop: '2rem'}}
      className="footer fixed-bottom ps-2">
        &copy; Team KKD 2025
    </Navbar>
  )
}

export default Footer;