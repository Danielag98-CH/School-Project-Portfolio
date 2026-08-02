import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAllArtists } from "../../api/artist-data-access";
import ArtistListItem from "./ArtistListItem";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

const ArtistList = () => {
  const navigate = useNavigate();
  const [artists, setArtists] = useState([]);
  const tableRef = useRef(null);
  const [tableWidth, setTableWidth] = useState(null);

  useEffect(() => {
    getAllArtists()
      .then(artists => {
        setArtists(artists);
      })
      .catch(err => {
        console.error("Error fetching artists:", err);
      });
  }, []);
  
  useEffect(() => {
    if (tableRef.current) {
      setTableWidth(tableRef.current.offsetWidth);
    }
  }, [artists]);

  // Sorting functions
  const artistNameAscend = () => setArtists([...artists].sort((a, b) => a.name.localeCompare(b.name)));
  const artistNameDescend = () => setArtists([...artists].sort((a, b) => b.name.localeCompare(a.name)));

  const handleOptionSelect = (eventKey) => {
    switch (eventKey) {
      case "artistAscend":
        artistNameAscend();
        break;
      case "artistDescend":
        artistNameDescend();
        break;
      default:
        break;
    }
  };

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
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: '1rem',
    marginBottom: '4rem',
    display: 'block',
    textAlign: 'center',
    width: '100%'
  }

  const notSmallScreen = {
    display: 'inline-block',
    marginTop: '1rem',
    marginRight: '1rem',
    marginBottom: '4rem',
    marginLeft: '1rem',
    textAlign: 'center'
  }
  
  const isMobile = useIsMobile();

  return (
    <div role="region" aria-labelledby="artists-list-heading" style={{ textAlign: "left" }}>
      <div style={ isMobile ? smallScreen : notSmallScreen }>
        <div style={{ backgroundColor: "rgba(100, 100, 100, 0.4)", padding: ".25rem", borderRadius: "10px", marginBottom: "1rem" }}>   
          <h3
            id="artist-list-heading"
            style={{
              marginBottom: "1rem",
              width: tableWidth ? tableWidth : "auto",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            All of the Artists currently in the library are listed below.
          </h3>
          <h3
            style={{
              marginBottom: "1rem",
              width: tableWidth ? tableWidth : "auto",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            Make a selection to View Details or Edit any of the Artists.
          </h3>
        </div>
        <DropdownButton id="dropdown-basic-button" variant="dark" title="Sort by " onSelect={handleOptionSelect}>
          <Dropdown.Item eventKey="artistAscend">Ascending</Dropdown.Item>
          <Dropdown.Item eventKey="artistDescend">Descending</Dropdown.Item>
        </DropdownButton>
        <table
          role="table"
          aria-label="Artist list"
          ref={tableRef}
          style={{ width: "auto", tableLayout: "auto", marginTop: "1rem", opacity: "0.85", margin: isMobile ? "1rem auto" : '1rem' }}
          className="table table-striped table-bordered border-dark"
        >
          <thead>
            <tr className="align-middle">
              <th>Name</th>
              <th>View Details</th>
              <th>Edit Artist</th>
            </tr>
          </thead>
          <tbody>
            {artists.map((a) => (
              <ArtistListItem key={a.id} artist={a} />
            ))}
          </tbody>
        </table>
        <div style={{ textAlign: "center", marginTop: "1rem" }}>
          <button
            style={{marginBottom: "4rem"}}
            className="btn btn-primary btn-outline-light btn-md"
            onClick={() => navigate("add/")}
            aria-label="Add new artist"
          >
            <i className="bi bi-plus-square" />
            &nbsp; Add New Artist
          </button>
        </div>
      </div>
    </div>
  );
};

export default ArtistList;