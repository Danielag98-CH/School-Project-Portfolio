import Table from 'react-bootstrap/Table';
import styles from './TracksTableDetails.module.css';


const TrackDetailsTable = ({ track }) => {
  const minutes = Math.floor(track.milliseconds / 60000);
  const seconds = Math.floor((track.milliseconds % 60000) / 1000);

  return (
    <div className={styles.mobileView}>
    <Table bordered responsive className={styles.gradientTable} >
      <tbody>
        <tr>
          <td className="text-center" colSpan={2}><h4><b>{track.name}</b></h4></td>
        </tr>
        <tr>
          <th>Track ID</th>
          <td>{track.id}</td>
        </tr>
        <tr>
          <th>Album</th>
          <td>
            {track.album}
            <small className="text-muted"></small>
          </td>
        </tr>
        <tr>
          <th>Genre</th>
          <td>
            {track.genre}
            <small className="text-muted"></small>
          </td>
        </tr>
        <tr>
          <th>Media Type</th>
          <td>
            {track.mediaType}
            <small className="text-muted"></small>
          </td>
        </tr>
        <tr>
          <th>Length</th>
          <td>{minutes}m {seconds}s</td>
        </tr>
        <tr>
          <th>Price</th>
          <td>${track.price}</td>
        </tr>
      </tbody>
    </Table>
    </div>
  );
};


export default TrackDetailsTable;