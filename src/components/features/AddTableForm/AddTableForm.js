import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addTableRequest } from '../../../Utils/FetchFunction';
import TableForm from '../TableForm/TableForm';

const AddTableForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (tableData) => {
    dispatch(addTableRequest(tableData, 'storage'));
    navigate('/storage');
  };

  return <TableForm action={handleSubmit} actionText="Add Table" />;
};

export default AddTableForm;
