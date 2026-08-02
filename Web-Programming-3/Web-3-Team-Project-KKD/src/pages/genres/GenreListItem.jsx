import { Link } from 'react-router-dom';
 
const GenreListItem = ({genre}) => {
  return (
    <>  
      <tr className='align-middle'>
          <td>{genre.name}</td>
          <td>
            <Link to={"/genres/" + genre.id}>
              <button className="btn btn-info btn-outline-dark btn-sm">
                <i className="bi bi-book-half" /> 
                &nbsp;View Details
              </button>
            </Link>
          </td>
          <td>
            <Link to={"/genres/edit/" + genre.id}>
              <button className="btn btn-outline-success btn-light btn-sm">
                <i className="bi bi-pencil-square" />
                &nbsp;Edit Genre
              </button>
            </Link>
          </td>
      </tr>
    </>
  )
}
 
export default GenreListItem;