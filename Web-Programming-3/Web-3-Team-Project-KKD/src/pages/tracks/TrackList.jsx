import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllTracks, deleteTrack } from '../../api/track-data-access';
import TrackListItem from './TrackListItem';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

const TrackList = () => {
  const navigate = useNavigate();
  const [tracks, setTracks] = useState([]);
  const tableRef = useRef(null);
  const [tableWidth, setTableWidth] = useState(null);
  const [refreshTracks, setRefreshTracks] = useState(false);


  // // Function to get all tracks
  function fetchTracks(){getAllTracks().then(setTracks)} 

  // forced re-render of tracks
  useEffect(() => {fetchTracks()}, [refreshTracks]);

  const handleDelete = async(id) => {
    await deleteTrack(id);
    setRefreshTracks(prev => !prev);
  }

  useEffect(() => {
    if (tableRef.current) {
      setTableWidth(tableRef.current.offsetWidth);
    }
  }, [tracks]);

  // Sorting functions
  const tracksNameAscend = () => setTracks([...tracks].sort((a, b) => a.name.localeCompare(b.name)));
  const tracksNameDescend = () => setTracks([...tracks].sort((a, b) => b.name.localeCompare(a.name)));

  const handleOptionSelect = (eventKey) => {
    switch (eventKey) {
      case "tracksAscend":
        tracksNameAscend();
        break;
      case "tracksDescend":
        tracksNameDescend();
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
      <div style={{ textAlign: "left" }}>
        <div style={isMobile ? smallScreen : notSmallScreen} >
          <div style={{ backgroundColor: "rgba(100, 100, 100, 0.4)", padding: ".25rem", borderRadius: "10px", marginBottom: "1rem" }}>  
            <h3
              style={{
                marginBottom: "1rem",
                width: tableWidth ? tableWidth : "auto",
                marginLeft: "auto",
                marginRight: "auto",
              }}
              role="region"
              aria-labelledby="track-table-heading"

            >
              All of the Tracks currently in the library are listed below.
            </h3>
            <h3
              id="track-table-heading"
              style={{
                marginBottom: "1rem",
                width: tableWidth ? tableWidth : "auto",
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
              Make a selection to View Details or Edit any of the Tracks.
            </h3>
          </div>  
          <DropdownButton id="dropdown-basic-button" variant="dark" title="Sort by " onSelect={handleOptionSelect} aria-label="Sort track list">
            <Dropdown.Item eventKey="tracksAscend">Ascending</Dropdown.Item>
            <Dropdown.Item eventKey="tracksDescend">Descending</Dropdown.Item>
          </DropdownButton>
          <div className='responsive-table-container'>
            <table
              ref={tableRef}
              style={{ width: "auto", tableLayout: "auto", marginTop: "1rem", opacity: "0.85", margin: isMobile ? "1rem auto" : '1rem' }}
              className="responsive-table table table-striped table-bordered border-dark"
              role="table"
              aria-describedby="track-table-heading"
            >
              <thead>
                <tr className="align-middle">
                  <th>Name</th>
                  <th>View Details</th>
                  <th>Edit Track</th>
                  <th>Delete Track</th>
                </tr>
              </thead>
              <tbody>
                {tracks.map((t) => (
                  <TrackListItem key={t.id} track={t} onDelete={handleDelete}/>
                ))}
              </tbody>
            </table>
          </div>
          <div style={{ textAlign: "center", marginTop: "1rem" }}>
            <button
              style={{marginBottom: "4rem"}}
              className="btn btn-primary btn-outline-light btn-md"
              onClick={() => navigate("add/")}
              aria-label="Add new track"
            >
              <i className="bi bi-plus-square" />
              &nbsp; Add New Track
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default TrackList;