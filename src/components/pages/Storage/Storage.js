import { Button, Container } from 'react-bootstrap';
import StorageTables from '../../features/StorageTables.js/StorageTables';
import { useNavigate } from 'react-router-dom';
import Loader from '../../views/Loader/Loader';
import { useSelector } from 'react-redux';
import { selectAreTablesLoading } from '../../../Redux/tablesRedux';

const Storage = () => {
  const navigate = useNavigate();
  const isLoading = useSelector(selectAreTablesLoading);

  const handleAddPost = (e) => {
    navigate('/table/add');
  };
  return (
    <div>
      {isLoading && <Loader />}
      {!isLoading && (
        <Container className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="mb-4">All Tables</h2>
          <Button onClick={handleAddPost} variant="outline-info">
            Add Table
          </Button>
        </Container>
      )}
      <StorageTables />
    </div>
  );
};

export default Storage;
