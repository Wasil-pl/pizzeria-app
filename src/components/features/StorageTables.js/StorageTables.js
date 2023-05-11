import { Button, Col, Container, Row } from 'react-bootstrap';
import styles from './StorageTables.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { getAllTables } from '../../../Redux/storageRedux';
import { addTableRequest, removeTableRequest } from '../../../Utils/FetchFunction';
import { useState } from 'react';
import DeleteTableModal from '../DeleteTableModal/DeleteTableModal';

const StorageTables = () => {
  const tables = useSelector(getAllTables);
  const dispatch = useDispatch();

  const [showDeletePostModal, setShowDeletePostModal] = useState(false);

  const handleCloseModal = () => setShowDeletePostModal(false);
  const handleShowModal = () => setShowDeletePostModal(true);

  const handleMoveToStore = (tableData) => {
    dispatch(addTableRequest(tableData, 'tables'));
    dispatch(removeTableRequest(tableData, 'storage'));
  };

  const onConfirmDeleteTable = (e, tableData) => {
    e.preventDefault();
    dispatch(removeTableRequest(tableData, 'storage'));
    handleCloseModal();
  };

  return (
    <Container className={styles.container}>
      <Col>
        {tables.map((table) => (
          <div key={table.id} to={'/table/' + table.id}>
            <Row className="p-3 border-bottom rounded">
              <Col sm={8}>
                <h3 className={`m-10 ${styles.name}`}>{table.name}</h3>
                <p>
                  <span className="fw-bold">Max people: </span>
                  {table.maxPeopleAmount}
                </p>
              </Col>
              <Col className={styles.button} sm={4}>
                <Button onClick={() => handleMoveToStore(table)} variant="primary">
                  Move to Home
                </Button>
                <Button onClick={handleShowModal} variant="danger">
                  Delete table
                </Button>
                <DeleteTableModal
                  show={showDeletePostModal}
                  onClose={handleCloseModal}
                  onConfirmDeleteTable={(e) => onConfirmDeleteTable(e, table)}
                />
              </Col>
            </Row>
          </div>
        ))}
      </Col>
    </Container>
  );
};

export default StorageTables;
