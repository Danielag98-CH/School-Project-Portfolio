import { Link } from 'react-router-dom';

const MediaTypesListItem = ({mediaType}) => {
  return (
    <>  
      <tr className='align-middle'>
          <td>{mediaType.name}</td>
          <td>
            <Link to={"/mediaTypes/" + mediaType.id}>
              <button className="btn btn-info btn-outline-dark btn-sm">
                <i className="bi bi-book-half" /> 
                &nbsp;View Details
              </button>
            </Link>
          </td>
          <td>
            <Link to={"/mediaTypes/edit/" + mediaType.id}>
              <button className="btn btn-outline-success btn-light btn-sm">
                <i className="bi bi-pencil-square" />
                &nbsp;Edit Media Type
              </button>
            </Link>
          </td>
      </tr>
    </>
  )
}

export default MediaTypesListItem;