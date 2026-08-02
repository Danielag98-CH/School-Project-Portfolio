import Table from 'react-bootstrap/Table';
import styles from './ViewDetailsTable.module.css';

const MediaTypesDetailsTable = ({ mediaType }) => {

  return (
    <div className={styles.mobileView}>
    <Table bordered responsive className={styles.gradientTable}>
      <tbody>
        <tr>
          <th>MediaType ID</th>
          <td>
            {mediaType.id}
            <small className="text-muted"></small>
          </td>
        </tr>
        <tr>
          <th>MediaType Name</th>
          <td>
            {mediaType.name}
            <small className="text-muted"></small>
          </td>
        </tr>
        
      </tbody>
    </Table>
    </div>
  );
};

export default MediaTypesDetailsTable;