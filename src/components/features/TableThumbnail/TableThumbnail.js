import { Button, Col, Row } from 'react-bootstrap';

const TableThumbnail = ({ name, status, peopleAmount, bill, shortDescription, id }) => {
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
        <Button>ShowMore</Button>
      </Col>
    </Row>
  );
};

export default TableThumbnail;
