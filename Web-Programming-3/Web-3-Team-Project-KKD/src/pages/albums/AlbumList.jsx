import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllAlbums } from '../../api/album-data-access';
import AlbumListItem from './AlbumListItem';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

const AlbumList = () => {
  const navigate = useNavigate();
  const [albums, setAlbums] = useState([]);
  const tableRef = useRef(null);
  const [tableWidth, setTableWidth] = useState(null);

  useEffect(()=>{
    getAllAlbums().then(albums => setAlbums(albums))
  },[]);

  useEffect(() => {
    if (tableRef.current) {
      setTableWidth(tableRef.current.offsetWidth);
    }
  }, [albums]);

  // Sorting functions
  const albumNameAscend = () => setAlbums([...albums].sort((a, b) => a.title.localeCompare(b.title)));
  const albumNameDescend = () => setAlbums([...albums].sort((a, b) => b.title.localeCompare(a.title)));

  const handleOptionSelect = (eventKey) => {
    switch (eventKey) {
      case "albumsAscend":
        albumNameAscend();
        break;
      case "albumsDescend":
        albumNameDescend();
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
    <>
      <div role="region" aria-labelledby="album-list-heading" style={{ textAlign: "left" }}>
        <div style={ isMobile ? smallScreen : notSmallScreen }>
          <div style={{ backgroundColor: "rgba(100, 100, 100, 0.4)", padding: ".25rem", borderRadius: "10px", marginBottom: "1rem" }}> 
            <h3
              style={{
                marginBottom: "1rem",
                width: tableWidth ? tableWidth : "auto",
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
              All of the Albums currently in the library are listed below.
            </h3>
            <h3
              id="album-list-heading"
              style={{
                marginBottom: "1rem",
                width: tableWidth ? tableWidth : "auto",
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
              Make a selection to View Details or Edit any of the Albums.
            </h3>
          </div>
          <DropdownButton id="dropdown-basic-button" variant="dark" title="Sort by " onSelect={handleOptionSelect} aria-label="Sort albums">
            <Dropdown.Item eventKey="albumsAscend">Ascending</Dropdown.Item>
            <Dropdown.Item eventKey="albumsDescend">Descending</Dropdown.Item>
          </DropdownButton>
          <table
            ref={tableRef}
            role="table"
            aria-label="Album list"
            style={{ width: "auto", tableLayout: "auto", marginTop: "1rem", opacity: "0.85", margin: isMobile ? "1rem auto" : '1rem' }}
            className="table table-striped table-bordered border-dark"
          >
            <thead>
              <tr className="align-middle">
                <th>Name</th>
                <th>View Details</th>
                <th>Edit Album</th>
              </tr>
            </thead>
            <tbody>
              {albums.map((a) => (
                <AlbumListItem key={a.id} album={a} />
              ))}
            </tbody>
          </table>
          <div style={{ textAlign: "center", marginTop: "1rem" }}>
            <button
            style={{marginBottom: "4rem"}}
              className="btn btn-primary btn-outline-light btn-md"
              onClick={() => navigate("add/")}
            >
              <i className="bi bi-plus-square" />
              &nbsp; Add New Album
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default AlbumList;