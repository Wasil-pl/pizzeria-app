import { Container } from 'react-bootstrap';
import StorageTables from '../../features/StorageTables.js/StorageTables';

const Storage = () => {
  return (
    <div>
      <Container className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-4">All Tables</h2>
      </Container>
      <StorageTables />
    </div>
  );
};

export default Storage;
