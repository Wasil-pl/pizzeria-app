import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import TableForm from '../TableForm/TableForm';
import { Container } from 'react-bootstrap';
import { addTableRequest } from '../../../Redux/tablesRedux';

const AddTableForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (tableData) => {
    dispatch(addTableRequest(tableData));
    navigate('/storage');
  };

  return (
    <Container>
      <TableForm action={handleSubmit} actionText="Add Table" />
    </Container>
  );
};

export default AddTableForm;
