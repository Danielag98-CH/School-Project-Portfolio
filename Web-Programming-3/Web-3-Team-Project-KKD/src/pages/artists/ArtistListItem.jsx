import { Link } from 'react-router-dom';

const ArtistListItem = ({artist}) => {
  return (
    <>  
      <tr className='align-middle'>
          <td>{artist.name}</td>
          <td>
            <Link to={"/artists/" + artist.id}>
              <button className="btn btn-info btn-outline-dark btn-sm">
                <i className="bi bi-book-half" /> 
                &nbsp;View Details
              </button>
            </Link>
          </td>
          <td>
            <Link to={"/artists/edit/" + artist.id}>
              <button className="btn btn-outline-success btn-light btn-sm">
                <i className="bi bi-pencil-square" />
                &nbsp;Edit Artist
              </button>
            </Link>
          </td>
      </tr>
    </>
  )
}

export default ArtistListItem;