import Table from 'react-bootstrap/Table';
import styles from './ViewDetailsTable.module.css';

const GenreDetailsTable = ({ genre }) => {

  return (
    <div className={styles.mobileView}>
    <Table bordered responsive className={styles.gradientTable}>
      <tbody>
        <tr>
          <th>Genre ID</th>
          <td>
            {genre.id}
            <small className="text-muted"></small>
          </td>
        </tr>
        <tr>
          <th>Genre Name</th>
          <td>
            {genre.name}
            <small className="text-muted"></small>
          </td>
        </tr>
        
      </tbody>
    </Table>
    </div>
  );
};

export default GenreDetailsTable;