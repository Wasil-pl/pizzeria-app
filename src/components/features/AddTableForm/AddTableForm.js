import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addTableRequest } from '../../../Utils/FetchFunction';
import TableForm from '../TableForm/TableForm';
import { Container } from 'react-bootstrap';

const AddTableForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (tableData) => {
    dispatch(addTableRequest(tableData, 'storage'));
    navigate('/storage');
  };

  return (
    <Container>
      <TableForm action={handleSubmit} actionText="Add Table" />
    </Container>
  );
};

export default AddTableForm;
