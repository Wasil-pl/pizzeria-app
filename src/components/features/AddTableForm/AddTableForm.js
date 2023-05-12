import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import TableForm from '../TableForm/TableForm';
import { Container } from 'react-bootstrap';
import { addTableRequest } from '../../../Redux/tablesRedux';
import { LIST_NAMES } from '../../../consts';

const AddTableForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (tableData) => {
    dispatch(addTableRequest(tableData, LIST_NAMES.storage));
    navigate('/storage');
  };

  return (
    <Container>
      <TableForm action={handleSubmit} actionText="Add Table" />
    </Container>
  );
};

export default AddTableForm;
