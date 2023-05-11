import { Button, Col, Container, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getAllTables } from '../../../Redux/storageRedux';
import { addTableRequest, removeTableRequest } from '../../../Utils/FetchFunction';

const StorageTables = () => {
  const tables = useSelector(getAllTables);
  const dispatch = useDispatch();

  const handleMoveToStore = (tableData) => {
    dispatch(addTableRequest(tableData, 'tables'));
    dispatch(removeTableRequest(tableData, 'storage'));
  };

  const deleteTable = (tableData) => {
    dispatch(removeTableRequest(tableData, 'storage'));
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
                <Button onClick={() => handleMoveToStore(table)} variant="primary">
                  Move to Home
                </Button>
                <Button onClick={() => deleteTable(table)} variant="danger">
                  Delete table
                </Button>
              </Col>
            </Row>
          </div>
        ))}
      </Col>
    </Container>
  );
};

export default StorageTables;
