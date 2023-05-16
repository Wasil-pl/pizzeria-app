import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { getTableById, moveRequest, updateRequest } from '../../../Redux/tablesRedux';
import TableForm from '../TableForm/TableForm';
import { Button, Container } from 'react-bootstrap';

import { LIST_NAMES } from '../../../consts';

const SingleTable = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const tableData = useSelector((state) => getTableById(state, id));

  const handleSubmit = (table) => {
    dispatch(updateRequest({ ...table, id }));
    navigate('/');
  };

  const handleMoveToStorage = (tableId) => {
    dispatch(moveRequest({ tableId, listId: LIST_NAMES.storage }));
    navigate('/');
  };

  if (!tableData) return <Navigate to="/" />;
  return (
    <div>
      <Container className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-4">{tableData.name}</h2>
        <Button onClick={() => handleMoveToStorage(tableData.id)}>Move to Storage</Button>
      </Container>
      <TableForm
        name={tableData.name}
        action={handleSubmit}
        status={tableData.status}
        peopleAmount={tableData.peopleAmount}
        maxPeopleAmount={tableData.maxPeopleAmount}
        bill={tableData.bill}
        actionText="Update Table"
      />
    </div>
  );
};

export default SingleTable;
