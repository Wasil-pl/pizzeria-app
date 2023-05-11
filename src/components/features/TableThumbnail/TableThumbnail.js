import { Button, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styles from './TableThumbnail.module.scss';
import SingleTable from '../SingleTable.js/SingleTable';

const TableThumbnail = ({ name, status, id }) => {
  return (
    <Row className={`p-3 border-bottom rounded ${styles.row}`}>
      <Col sm={10}>
        <h3 className={`m-10 ${styles.name}`}>{name}</h3>
        <p>
          <span className="fw-bold">status: </span>
          {status}
        </p>
      </Col>
      <Col className={styles.button} sm={2}>
        <Link to={`/table/${id}`} element={<SingleTable />}>
          <Button variant="primary">Show more</Button>
        </Link>
      </Col>
    </Row>
  );
};

export default TableThumbnail;
