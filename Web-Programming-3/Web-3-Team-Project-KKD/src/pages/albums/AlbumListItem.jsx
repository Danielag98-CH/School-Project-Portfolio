import { Link } from 'react-router-dom';

const AlbumListItem = ({album}) => {
  return (
    <>  
      <tr className='align-middle'>
          <td>{album.title}</td>
          <td>
            <Link to={"/albums/" + album.id}>
              <button className="btn btn-info btn-outline-dark btn-sm">
                <i className="bi bi-book-half" /> 
                &nbsp;View Details
              </button>
            </Link>
          </td>
          <td>
            <Link to={"/albums/edit/" + album.id}>
              <button className="btn btn-outline-success btn-light btn-sm">
                <i className="bi bi-pencil-square" />
                &nbsp;Edit Album
              </button>
            </Link>
          </td>
      </tr>
    </>
  )
}

export default AlbumListItem;