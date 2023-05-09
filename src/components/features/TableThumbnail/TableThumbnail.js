import { Button, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import SingleTable from '../SingleTable.js/SingleTable';

const TableThumbnail = ({ name, status, peopleAmount, bill, id }) => {
  return (
    <Row className="p-3 border-bottom rounded">
      <Col sm={10}>
        <h3 className="m-10">{name}</h3>
        <p>
          <span className="fw-bold">status: </span>
          {status}
        </p>
      </Col>
      <Col sm={2}>
        <Link to={`/table/${id}`} element={<SingleTable />}>
          <Button variant="primary">Show more</Button>
        </Link>
      </Col>
    </Row>
  );
};

export default TableThumbnail;
