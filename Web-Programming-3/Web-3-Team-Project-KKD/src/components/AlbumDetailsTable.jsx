import Table from 'react-bootstrap/Table';
import styles from './ViewDetailsTable.module.css';

const AlbumDetailsTable = ({ album }) => {

  return (
    <div className={styles.mobileView}>
    <Table bordered responsive className={styles.gradientTable}>
      <tbody>
        <tr>
          <td className="text-center" colSpan={2}><h4><b>{album.title}</b></h4></td>
        </tr>
        <tr>
          <th>Album ID</th>
          <td>{album.id}</td>
        </tr>
        <tr>
          <th>Artist</th>
          <td>
            {album.artist}
            <small className="text-muted"> </small>
          </td>
        </tr>
        
      </tbody>
    </Table>
    </div>
  );
};

export default AlbumDetailsTable;