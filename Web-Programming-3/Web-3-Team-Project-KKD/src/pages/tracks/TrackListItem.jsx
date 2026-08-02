import { Link } from 'react-router-dom';

const TrackListItem = ({track, onDelete}) => {
  return (
    <>  
      <tr className='align-middle'>
          <td>{track.name}</td>
          <td>
            <Link to={"/tracks/" + track.id}>
              <button className="btn btn-info btn-outline-dark btn-sm">
                <i className="bi bi-book-half" /> 
                &nbsp;View Details
              </button>
            </Link>
          </td>
          <td>
            <Link to={"/tracks/edit/" + track.id}>
              <button className="btn btn-outline-success btn-light btn-sm">
                <i className="bi bi-pencil-square" />
                &nbsp;Edit track
              </button>
            </Link>
          </td>
          <td>
            <button className="btn btn-outline-danger btn-light btn-sm"
                    onClick={() => onDelete(track.id)}>
              <i className="bi bi-x-square" />
              &nbsp;Delete Track
            </button>
          </td>
      </tr>
    </>
  )
}
export default TrackListItem;