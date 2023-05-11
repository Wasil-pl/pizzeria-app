import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useNavigate, useParams } from 'react-router-dom';

import { getTableById } from '../../../Redux/tablesRedux';
import TableForm from '../TableForm/TableForm';
import { Button, Container } from 'react-bootstrap';
import { addTableRequest, removeTableRequest, updateRequest } from '../../../Utils/FetchFunction';

const SingleTable = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const tableData = useSelector((state) => getTableById(state, id));

  const handleSubmit = (table) => {
    dispatch(updateRequest({ ...table, id }));
    navigate('/');
  };

  const handleMoveToStorage = (tableData) => {
    dispatch(addTableRequest(tableData, 'storage'));
    dispatch(removeTableRequest(tableData, 'tables'));
    navigate('/');
  };

  if (!tableData) return <Navigate to="/" />;
  return (
    <div>
      <Container className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-4">{tableData.name}</h2>
        <Button onClick={() => handleMoveToStorage(tableData)}>Move to Storage</Button>
      </Container>
      <TableForm
        name={tableData.name}
        action={handleSubmit}
        status={tableData.status}
        peopleAmount={tableData.peopleAmount}
        maxPeopleAmount={tableData.maxPeopleAmount}
        bill={tableData.bill}
      />
    </div>
  );
};

export default SingleTable;
