import Table from 'react-bootstrap/Table';
import styles from './ViewDetailsTable.module.css';

const ArtistDetailsTable = ({ artist }) => {

  return (
    <div className={styles.mobileView}>
    <Table bordered responsive className={styles.gradientTable}>
      <tbody>
         <tr>
          <th>Artist ID</th>
          <td>
            {artist.id}
            <small className="text-muted"></small>
          </td>
        </tr>
        <tr>
          <th>Artist Name</th>
          <td>{artist.name}</td>
        </tr>
        
      </tbody>
    </Table>
    </div>
  );
};

export default ArtistDetailsTable;