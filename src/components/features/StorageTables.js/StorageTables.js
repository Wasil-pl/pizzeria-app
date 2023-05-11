import { Button, Col, Container, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getAllTables, moveTableToHomeByRemoveRequest } from '../../../Redux/storageRedux';
import { moveTableToHomeByAddRequest } from '../../../Redux/tablesRedux';

const StorageTables = () => {
  const tables = useSelector(getAllTables);
  const dispatch = useDispatch();
  console.log('tables:', tables);

  const handleMoveToHome = (tableData) => {
    dispatch(moveTableToHomeByAddRequest(tableData));
    dispatch(moveTableToHomeByRemoveRequest(tableData));
  };

  return (
    <Container>
      <Col>
        {tables.map((table) => (
          <div key={table.id} to={'/table/' + table.id}>
            <Row className="p-3 border-bottom rounded">
              <Col sm={8}>
                <h3 className="m-10">{table.name}</h3>
                <p>
                  <span className="fw-bold">Max people: </span>
                  {table.maxPeopleAmount}
                </p>
              </Col>
              <Col sm={4}>
                <Button onClick={() => handleMoveToHome(table)} variant="primary">
                  Move to Home
                </Button>
                <Button variant="danger">Delete table</Button>
              </Col>
            </Row>
          </div>
        ))}
      </Col>
    </Container>
  );
};

export default StorageTables;
