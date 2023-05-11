import { Button, Col, Row } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styles from './TableThumbnail.module.scss';
import SingleTable from '../SingleTable.js/SingleTable';

const TableThumbnail = ({ name, status, id, bill }) => {
  return (
    <Row className={`p-3 border-bottom rounded ${styles.row}`}>
      <Col sm={10}>
        <h3 className={`m-10 ${styles.name}`}>{name}</h3>
        <p>
          <span className="fw-bold">status: </span>
          {status}
        </p>
        {status === 'Busy' && (
          <p>
            <span className="fw-bold">Bill: </span>
            {bill}
          </p>
        )}
      </Col>
      <Col className={styles.button} sm={2}>
        <Link to={`/table/${id}`} element={<SingleTable />}>
          <Button variant="primary">Show more</Button>
        </Link>
      </Col>
    </Row>
  );
};

TableThumbnail.propTypes = {
  name: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  id: PropTypes.string,
  bill: PropTypes.number,
};

export default TableThumbnail;
