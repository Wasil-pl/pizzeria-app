import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useNavigate, useParams } from 'react-router-dom';

import { getTableById, moveTableByRemoveRequest, updateRequest } from '../../../Redux/tablesRedux';
import TableForm from '../TableForm/TableForm';
import { Button, Container } from 'react-bootstrap';
import { moveTableByAddRequest } from '../../../Redux/storageRedux';

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
    dispatch(moveTableByAddRequest(tableData));
    dispatch(moveTableByRemoveRequest(tableData));
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
